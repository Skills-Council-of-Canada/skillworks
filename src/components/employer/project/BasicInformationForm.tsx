import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ProjectFormData } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  title: z.string()
    .min(5, "Project title must be at least 5 characters")
    .max(200, "Project title cannot exceed 200 characters"),
  description: z.string()
    .min(50, "Project description must be at least 50 characters"),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const EXAMPLE_PROJECTS = [
  "Install electrical wiring for a residential project",
  "Complete plumbing installation for a commercial kitchen",
  "Renovate and upgrade HVAC system in an office building",
];

const BasicInformationForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
    },
  });
  
  const isMobile = useIsMobile();
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [previewMode, setPreviewMode] = useState(false);

  const handleGenerateProject = () => {
    console.log("Generate project clicked");
  };

  const handleUseTemplate = () => {
    console.log("Use template clicked");
  };

  const formatText = (format: string) => {
    const textarea = document.getElementById("project-description") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = "";
    let cursorPosition = 0;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        cursorPosition = 2;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        cursorPosition = 1;
        break;
      case 'underline':
        formattedText = `_${selectedText}_`;
        cursorPosition = 1;
        break;
      case 'bullet':
        if (selectedText) {
          const lines = selectedText.split('\n');
          formattedText = lines.map(line => `• ${line}`).join('\n');
        } else {
          formattedText = `• `;
        }
        cursorPosition = 2;
        break;
      case 'number':
        if (selectedText) {
          const lines = selectedText.split('\n');
          formattedText = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
        } else {
          formattedText = `1. `;
        }
        cursorPosition = 3; // Assuming single digit numbers
        break;
      default:
        return;
    }

    const newText = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    form.setValue('description', newText, { shouldValidate: true });
    updatePreview(newText);
    
    setTimeout(() => {
      textarea.focus();
      if (selectedText.length === 0) {
        textarea.setSelectionRange(start + cursorPosition, start + cursorPosition);
      } else {
        textarea.setSelectionRange(start, start + formattedText.length);
      }
    }, 0);
  };

  const formatDisplayText = (text: string) => {
    if (!text) return "";
    
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<u>$1</u>')
      .replace(/^• (.*)$/gm, '<div class="bullet-item">• $1</div>')
      .replace(/^(\d+)\. (.*)$/gm, '<div class="number-item">$1. $2</div>');
    
    return formattedText;
  };

  const updatePreview = (text: string) => {
    const formatted = formatDisplayText(text);
    setPreviewHtml(formatted);
  };

  const resizeTextarea = () => {
    const textarea = titleTextareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .bullet-item, .number-item {
        display: flex;
        padding-left: 1.5em;
        text-indent: -1.5em;
        margin-bottom: 0.25em;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    console.log("BasicInformationForm rendered, using form ID: step-1-form");
    updatePreview(form.getValues().description || '');
  }, []);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'description') {
        updatePreview(value.description || '');
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6 bg-[#F1F1F1]">
        <h3 className="font-semibold mb-2">Example Projects</h3>
        <ul className="space-y-2 text-muted-foreground max-w-full">
          {EXAMPLE_PROJECTS.map((example, index) => (
            <li key={index} className="flex items-start break-words">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-primary" />
              <span className="inline-block">{example}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Form {...form}>
        <form
          id="step-1-form"
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted", data);
            onSubmit(data);
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Objective</FormLabel>
                <FormControl>
                  <Textarea 
                    ref={titleTextareaRef}
                    placeholder="Write a short, clear objective for your project"
                    maxLength={200}
                    className="min-h-[40px] overflow-hidden resize-none"
                    onInput={resizeTextarea}
                    rows={1}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <div className="space-y-2">
                  <div className="bg-white p-1 rounded-md flex flex-wrap gap-1 items-center border border-input justify-between">
                    <div className="flex flex-wrap gap-1 items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              type="button"
                              onClick={() => formatText('bold')}
                            >
                              <Bold className="h-4 w-4" />
                              <span className="sr-only">Bold</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bold</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              type="button"
                              onClick={() => formatText('italic')}
                            >
                              <Italic className="h-4 w-4" />
                              <span className="sr-only">Italic</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Italic</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              type="button"
                              onClick={() => formatText('underline')}
                            >
                              <Underline className="h-4 w-4" />
                              <span className="sr-only">Underline</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Underline</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <div className="w-px h-6 bg-border mx-1" />
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              type="button"
                              onClick={() => formatText('bullet')}
                            >
                              <List className="h-4 w-4" />
                              <span className="sr-only">Bullet List</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bullet List</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              type="button"
                              onClick={() => formatText('number')}
                            >
                              <ListOrdered className="h-4 w-4" />
                              <span className="sr-only">Numbered List</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Numbered List</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                  </div>
                  
                  {previewMode ? (
                    <div 
                      className="min-h-[150px] w-full border rounded-md p-3 bg-white overflow-auto"
                      dangerouslySetInnerHTML={{ __html: previewHtml }}
                    />
                  ) : (
                    <FormControl>
                      <Textarea
                        id="project-description"
                        className="min-h-[150px] w-full"
                        placeholder="Describe your project in detail..."
                        {...field}
                        ref={descriptionRef}
                      />
                    </FormControl>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Formatting: Use <span className="font-bold">**text**</span> for bold, <span className="italic">*text*</span> for italic, <span className="underline">_text_</span> for underline
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
            <Button
              type="button"
              onClick={handleGenerateProject}
              className="bg-orange-500 hover:bg-orange-600"
              size={isMobile ? "sm" : "default"}
            >
              Generate Project
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size={isMobile ? "sm" : "default"}
              className="whitespace-normal text-left h-auto py-2"
            >
              Create Project from Scratch
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleUseTemplate}
              size={isMobile ? "sm" : "default"}
            >
              Use Template
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInformationForm;
