
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
import type { ProjectFormData } from "@/types/project";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  images: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported.")),
  documents: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Only .pdf and .doc formats are supported.")),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const MediaUploadsForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      documents: [],
    },
  });

  return (
    <Form {...form}>
      <form
        id="step-5-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Documents</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_DOCUMENT_TYPES.join(",")}
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default MediaUploadsForm;
