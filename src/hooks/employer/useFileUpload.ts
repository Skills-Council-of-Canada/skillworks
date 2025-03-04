
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/components/employer/project/media-uploads/uploadUtils";
import type { ProjectFormData } from "@/types/project";

export function useFileUpload(projectId?: string) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (data: {
    images: File[];
    documents: File[];
  }, onSuccess: (data: Partial<ProjectFormData>) => void) => {
    if (!projectId) {
      toast({
        title: "Error",
        description: "Project ID is required for file uploads",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload images
      for (let i = 0; i < data.images.length; i++) {
        const file = data.images[i];
        setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 0 }));
        
        try {
          await uploadFile(file, 'image', projectId);
          setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 100 }));
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload image ${file.name}`,
            variant: "destructive",
          });
        }
      }

      // Upload documents
      for (let i = 0; i < data.documents.length; i++) {
        const file = data.documents[i];
        setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 0 }));
        
        try {
          await uploadFile(file, 'document', projectId);
          setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 100 }));
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload document ${file.name}`,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Success",
        description: "All files uploaded successfully",
      });

      onSuccess(data);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadProgress,
    isUploading,
    handleFileUpload
  };
}
