
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/types/project";
import { supabase } from "@/integrations/supabase/client";

type FileData = {
  images?: File[];
  documents?: File[];
};

export function useFileUpload(projectId?: string) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(async (file: File, type: 'image' | 'document', index: number) => {
    if (!projectId) {
      throw new Error("Project ID is required for file uploads");
    }
    
    try {
      // Update progress to show upload started
      setUploadProgress(prev => ({ ...prev, [`${type}-${index}`]: 10 }));
      
      // Prepare form data for the upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      formData.append('projectId', projectId);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('upload-project-files', {
        body: formData,
      });
      
      if (error) throw error;
      
      // Update progress to show upload completed
      setUploadProgress(prev => ({ ...prev, [`${type}-${index}`]: 100 }));
      
      return data?.filePath;
    } catch (error) {
      console.error(`Error uploading ${file.name}:`, error);
      toast({
        title: "Upload Error",
        description: `Failed to upload ${type} ${file.name}`,
        variant: "destructive",
      });
      throw error;
    }
  }, [projectId, toast]);

  const handleFileUpload = useCallback(async (
    data: FileData, 
    onSuccess: (data: Partial<ProjectFormData>) => void
  ) => {
    if (!projectId) {
      toast({
        title: "Error",
        description: "Project ID is required for file uploads",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress({});

    try {
      // Upload images
      const imagePromises = data.images?.map((file, i) => 
        uploadFile(file, 'image', i)
          .then(() => setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 100 })))
          .catch(() => setUploadProgress(prev => ({ ...prev, [`image-${i}`]: 0 })))
      ) || [];

      // Upload documents
      const documentPromises = data.documents?.map((file, i) => 
        uploadFile(file, 'document', i)
          .then(() => setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 100 })))
          .catch(() => setUploadProgress(prev => ({ ...prev, [`document-${i}`]: 0 })))
      ) || [];

      // Wait for all uploads to complete
      await Promise.all([...imagePromises, ...documentPromises]);

      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });

      // Call onSuccess with the uploaded files data
      onSuccess({
        images: data.images || [],
        documents: data.documents || []
      });
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
  }, [projectId, toast, uploadFile]);

  return {
    uploadProgress,
    isUploading,
    handleFileUpload
  };
}
