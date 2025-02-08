
import * as React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { CompanyInfoFormData } from "./schema";

interface LogoUploadProps {
  setValue: UseFormSetValue<CompanyInfoFormData>;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

export const LogoUpload = ({ setValue, previewUrl, setPreviewUrl }: LogoUploadProps) => {
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("logo", file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <FormItem>
      <FormLabel>Company Logo</FormLabel>
      <FormControl>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="logo-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Logo preview"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP (MAX. 5MB)
                  </p>
                </div>
              )}
              <Input
                id="logo-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleLogoChange}
              />
            </label>
          </div>
          <FormMessage />
        </div>
      </FormControl>
    </FormItem>
  );
};

