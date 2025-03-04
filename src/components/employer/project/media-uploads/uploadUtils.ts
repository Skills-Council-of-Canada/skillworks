
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Uploads a file to Supabase storage
 * @param file The file to upload
 * @param type The type of file ('image' or 'document')
 * @param folder Optional folder name to organize files
 * @returns Promise with the file URL or null if upload failed
 */
export const uploadFile = async (
  file: File, 
  type: 'image' | 'document', 
  folder?: string
): Promise<string | null> => {
  try {
    // Create a unique filename to prevent collisions
    const sanitizedFileName = file.name.replace(/[^\x00-\x7F]/g, '');
    const fileExt = sanitizedFileName.split('.').pop();
    const filePath = `${folder ? `${folder}/` : ''}${crypto.randomUUID()}.${fileExt}`;
    
    // Determine which bucket to use based on the file type
    const bucketId = type === 'image' ? 'project-images' : 'project-documents';
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketId)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false
      });
    
    if (error) {
      console.error('Error uploading file:', error);
      toast(`Upload failed: ${error.message}`);
      return null;
    }
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from(bucketId)
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Unexpected error during file upload:', error);
    toast('File upload failed. Please try again.');
    return null;
  }
};
