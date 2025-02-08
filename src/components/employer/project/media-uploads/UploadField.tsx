
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { UploadFieldProps } from "./types";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const UploadField = ({ field, uploadProgress, type }: UploadFieldProps) => {
  const acceptedTypes = type === 'image' ? ACCEPTED_IMAGE_TYPES : ACCEPTED_DOCUMENT_TYPES;
  const label = type === 'image' ? 'Project Images' : 'Project Documents';
  const helperText = type === 'image' 
    ? 'Upload clear, high-quality images of your project (JPG, PNG, or WEBP)' 
    : 'Upload relevant project documents (PDF or DOC)';

  return (
    <FormItem>
      <FormLabel className="text-base font-semibold">{label}</FormLabel>
      <Card className="p-4">
        <FormControl>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor={`${type}-upload`}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {helperText}
                  </p>
                </div>
                <Input
                  id={`${type}-upload`}
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(",")}
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    field.onChange(files);
                  }}
                  aria-label={`Upload ${type === 'image' ? 'images' : 'documents'}`}
                />
              </label>
            </div>
            {field.value?.map((file: File, index: number) => (
              <div key={`${type}-${index}`} className="space-y-2">
                <p className="text-sm truncate">{file.name}</p>
                {uploadProgress[`${type}-${index}`] !== undefined && (
                  <div className="space-y-1">
                    <Progress 
                      value={uploadProgress[`${type}-${index}`]} 
                      className="h-2"
                      aria-label={`Upload progress for ${file.name}`}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {uploadProgress[`${type}-${index}`]}%
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FormControl>
      </Card>
      <FormMessage />
    </FormItem>
  );
};

export default UploadField;

