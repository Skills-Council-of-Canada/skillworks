
import { supabase } from "@/integrations/supabase/client";

export const uploadFile = async (file: File, type: 'image' | 'document', projectId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('projectId', projectId);

  try {
    const { data: uploadResponse, error } = await supabase.functions.invoke('upload-project-files', {
      body: formData,
    });

    if (error) throw error;

    return uploadResponse.url;
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    throw error;
  }
};
