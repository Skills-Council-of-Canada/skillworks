
import { ProjectFormData } from "@/types/project";

export interface MediaUploadProps {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

export interface UploadFieldProps {
  field: any;
  uploadProgress: { [key: string]: number };
  type: 'image' | 'document';
}
