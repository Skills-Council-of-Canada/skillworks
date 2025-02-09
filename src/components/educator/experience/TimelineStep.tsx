
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { ExperienceFormValues, Milestone } from "@/types/educator";
import { toast } from "@/hooks/use-toast";

interface TimelineStepProps {
  form: UseFormReturn<ExperienceFormValues>;
  onNext: () => void;
}

const TimelineStep = ({ form, onNext }: TimelineStepProps) => {
  const [newMilestone, setNewMilestone] = useState<Partial<Milestone>>({
    title: "",
    description: "",
    due_date: "",
  });

  const handleAddMilestone = () => {
    if (!newMilestone.title || !newMilestone.due_date) {
      toast({
        title: "Missing Information",
        description: "Please fill in the milestone title and due date",
        variant: "destructive",
      });
      return;
    }

    const currentMilestones = form.getValues("milestones") || [];
    form.setValue("milestones", [
      ...currentMilestones,
      newMilestone as Milestone,
    ]);

    setNewMilestone({
      title: "",
      description: "",
      due_date: "",
    });
  };

  const handleRemoveMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones") || [];
    form.setValue(
      "milestones",
      currentMilestones.filter((_, i) => i !== index)
    );
  };

  const handleNext = () => {
    const startDate = form.getValues("start_date");
    const endDate = form.getValues("end_date");

    if (!startDate || !endDate) {
      toast({
        title: "Missing Dates",
        description: "Please set both start and end dates",
        variant: "destructive",
      });
      return;
    }

    // Validate that start date is at least 6 weeks from now
    const minStartDate = new Date();
    minStartDate.setDate(minStartDate.getDate() + 42); // 6 weeks * 7 days
    if (new Date(startDate) < minStartDate) {
      toast({
        title: "Invalid Start Date",
        description: "Start date must be at least 6 weeks from today",
        variant: "destructive",
      });
      return;
    }

    // Validate that end date is after start date
    if (new Date(endDate) <= new Date(startDate)) {
      toast({
        title: "Invalid End Date",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date?.toISOString() || "")
                    }
                    disabled={(date) => {
                      const minDate = new Date();
                      minDate.setDate(minDate.getDate() + 42); // 6 weeks minimum
                      return date < minDate;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(date?.toISOString() || "")
                    }
                    disabled={(date) => {
                      const startDate = form.getValues("start_date");
                      return startDate ? date <= new Date(startDate) : false;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Milestones</h3>
        
        <div className="space-y-4">
          {form.watch("milestones")?.map((milestone, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 border rounded-md"
            >
              <div className="flex-1 space-y-2">
                <p className="font-medium">{milestone.title}</p>
                <p className="text-sm text-muted-foreground">
                  {milestone.description}
                </p>
                <p className="text-sm">
                  Due: {format(new Date(milestone.due_date), "PPP")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMilestone(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4 p-4 border rounded-md">
          <div className="space-y-4">
            <Input
              placeholder="Milestone Title"
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Description (optional)"
              value={newMilestone.description}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, description: e.target.value })
              }
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newMilestone.due_date && "text-muted-foreground"
                  )}
                >
                  {newMilestone.due_date ? (
                    format(new Date(newMilestone.due_date), "PPP")
                  ) : (
                    <span>Pick a due date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    newMilestone.due_date
                      ? new Date(newMilestone.due_date)
                      : undefined
                  }
                  onSelect={(date) =>
                    setNewMilestone({
                      ...newMilestone,
                      due_date: date?.toISOString() || "",
                    })
                  }
                  disabled={(date) => {
                    const startDate = form.getValues("start_date");
                    const endDate = form.getValues("end_date");
                    return (
                      (startDate && date < new Date(startDate)) ||
                      (endDate && date > new Date(endDate))
                    );
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            type="button"
            className="w-full"
            onClick={handleAddMilestone}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Milestone
          </Button>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={handleNext}
          className="bg-primary hover:bg-primary/90"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default TimelineStep;
