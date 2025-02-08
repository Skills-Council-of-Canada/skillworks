
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { UploadFieldProps } from "./types";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const UploadField = ({ field, uploadProgress, type }: UploadFieldProps) => {
  const acceptedTypes = type === 'image' ? ACCEPTED_IMAGE_TYPES : ACCEPTED_DOCUMENT_TYPES;
  const label = type === 'image' ? 'Project Images' : 'Project Documents';

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept={acceptedTypes.join(",")}
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            field.onChange(files);
          }}
        />
      </FormControl>
      <FormMessage />
      {field.value.map((_, index: number) => (
        uploadProgress[`${type}-${index}`] !== undefined && (
          <Progress 
            key={`${type}-${index}`} 
            value={uploadProgress[`${type}-${index}`]} 
            className="w-full h-2"
          />
        )
      ))}
    </FormItem>
  );
};

export default UploadField;
