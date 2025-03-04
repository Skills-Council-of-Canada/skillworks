
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextEditor from "./TextEditor";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface DescriptionFieldProps {
  form: UseFormReturn<z.infer<any>>;
  initialDescription: string;
}

const DescriptionField = ({ form, initialDescription }: DescriptionFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field: { onChange, ...restField } }) => (
        <FormItem>
          <FormLabel>Project Details</FormLabel>
          <TextEditor 
            initialContent={initialDescription} 
            onChange={(content) => {
              form.setValue('description', content, { shouldValidate: true });
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
