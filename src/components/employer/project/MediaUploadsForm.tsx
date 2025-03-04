
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import type { ProjectFormData } from "@/types/project";
import UploadField from "./media-uploads/UploadField";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFileUploader } from "./media-uploads/FileUploadUtils";
import { useEffect } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
  images: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .webp formats are supported.")).optional().default([]),
  documents: z.array(z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_DOCUMENT_TYPES.includes(file.type), "Only .pdf and .doc formats are supported.")).optional().default([]),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const MediaUploadsForm = ({ initialData, onSubmit }: Props) => {
  const projectId = initialData.id;
  const { uploadProgress, isUploading, handleFilesUpload } = useFileUploader(projectId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      documents: [],
    },
  });
  
  useEffect(() => {
    console.log("MediaUploadsForm mounted with initialData:", initialData);
  }, [initialData]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submitting form with files:", {
      images: data.images?.length || 0,
      documents: data.documents?.length || 0
    });
    
    if (!data.images?.length && !data.documents?.length) {
      // No files to upload, just pass through
      onSubmit({});
      return;
    }
    
    // Upload files and get the results
    const result = await handleFilesUpload({
      images: data.images,
      documents: data.documents
    });
    
    if (result.success) {
      // Pass the form data to the parent component's onSubmit
      onSubmit({
        // Here we're just passing the files themselves
        // The actual file paths are handled by the upload function
        images: data.images || [],
        documents: data.documents || []
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight" id="upload-section-title">
          Media Uploads
        </h2>
        <p className="text-muted-foreground">
          Add photos and documents to help learners understand your project better.
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Images should be clear and well-lit. Documents should be in PDF or DOC format.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form
          id="step-5-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
          aria-labelledby="upload-section-title"
        >
          <UploadField
            field={form.register('images')}
            uploadProgress={uploadProgress}
            type="image"
          />
          
          <UploadField
            field={form.register('documents')}
            uploadProgress={uploadProgress}
            type="document"
          />

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {isUploading ? "Uploading files..." : "You can proceed without uploading files if needed."}
            </p>
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MediaUploadsForm;
