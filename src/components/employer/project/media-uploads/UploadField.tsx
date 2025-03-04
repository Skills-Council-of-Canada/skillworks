
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface UploadFieldProps {
  field: UseFormRegisterReturn;
  uploadProgress: { [key: string]: number };
  type: 'image' | 'document';
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const UploadField = ({ field, uploadProgress, type }: UploadFieldProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const acceptedTypes = type === 'image' ? ACCEPTED_IMAGE_TYPES : ACCEPTED_DOCUMENT_TYPES;
  const label = type === 'image' ? 'Project Images' : 'Project Documents';
  const helperText = type === 'image' 
    ? 'Upload clear, high-quality images of your project (JPG, PNG, or WEBP)' 
    : 'Upload relevant project documents (PDF or DOC)';

  // Log rendering and props for debugging
  useEffect(() => {
    console.log(`UploadField (${type}) rendered with:`, { field, files });
  }, [field, files, type]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      console.log(`${type} files selected:`, newFiles);
      setFiles(newFiles);
      
      // This is important - we need to update the field value in the form
      const event = {
        target: {
          name: field.name,
          value: newFiles
        }
      };
      field.onChange(event);
    }
  };

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
                  onChange={handleFileChange}
                  {...field}
                  aria-label={`Upload ${type === 'image' ? 'images' : 'documents'}`}
                />
              </label>
            </div>
            {files.map((file, index) => (
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
