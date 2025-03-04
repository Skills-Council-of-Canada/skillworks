
import { ProjectFormData } from "@/types/project";
import { UseFormRegisterReturn } from "react-hook-form";

export interface MediaUploadProps {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

export interface UploadFieldProps {
  field: UseFormRegisterReturn;
  uploadProgress: { [key: string]: number };
  type: 'image' | 'document';
}
