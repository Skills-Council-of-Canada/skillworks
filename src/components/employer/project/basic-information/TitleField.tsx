
import { useRef, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface TitleFieldProps {
  form: UseFormReturn<z.infer<any>>;
}

const TitleField = ({ form }: TitleFieldProps) => {
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
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
  );
};

export default TitleField;
