
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";

interface UploadFileButtonProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
}

export function UploadFileButton({ onUpload, accept }: UploadFileButtonProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await onUpload(file);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <Input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={isUploading}
      />
      <Button variant="outline" disabled={isUploading}>
        {isUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload File
          </>
        )}
      </Button>
    </div>
  );
}
