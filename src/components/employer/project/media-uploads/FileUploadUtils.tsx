
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadFile } from "./uploadUtils";

export interface UploadProgressMap {
  [key: string]: number;
}

export const useFileUploader = (projectId?: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgressMap>({});

  const uploadFile = useCallback(
    async (file: File, type: 'image' | 'document', index: number) => {
      try {
        // Update progress to show upload started
        setUploadProgress(prev => ({ ...prev, [`${type}-${index}`]: 10 }));
        
        // If we don't have a project ID yet, we'll use the direct upload method
        // instead of the edge function
        if (!projectId) {
          const folder = 'temp-uploads';
          const result = await import('./uploadUtils').then(mod => 
            mod.uploadFile(file, type, folder)
          );
          
          // Update progress to show upload completed
          setUploadProgress(prev => ({ ...prev, [`${type}-${index}`]: 100 }));
          
          return result;
        }
        
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
        
        return data.filePath;
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        setUploadProgress(prev => ({ ...prev, [`${type}-${index}`]: 0 }));
        throw error;
      }
    },
    [projectId]
  );

  const uploadFiles = useCallback(
    async (files: File[], type: 'image' | 'document') => {
      if (!files.length) return [];
      
      const uploadPromises = files.map((file, index) => 
        uploadFile(file, type, index)
      );
      
      return Promise.all(uploadPromises);
    },
    [uploadFile]
  );

  const handleFilesUpload = useCallback(
    async (data: { images?: File[], documents?: File[] }) => {
      setIsUploading(true);
      setUploadProgress({});
      
      try {
        const resultsMap: Record<string, string[]> = {};
        
        if (data.images && data.images.length > 0) {
          const imagePaths = await uploadFiles(data.images, 'image');
          resultsMap.images = imagePaths;
        }
        
        if (data.documents && data.documents.length > 0) {
          const documentPaths = await uploadFiles(data.documents, 'document');
          resultsMap.documents = documentPaths;
        }
        
        toast.success("All files uploaded successfully");
        return { success: true, paths: resultsMap };
      } catch (error) {
        console.error('File upload error:', error);
        toast.error("Error uploading files. Please try again.");
        return { success: false };
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFiles]
  );

  return {
    uploadProgress,
    isUploading,
    handleFilesUpload,
  };
};
