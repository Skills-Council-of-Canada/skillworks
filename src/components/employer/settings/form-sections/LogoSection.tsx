
import { FormField, FormItem } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { LogoUpload } from "../LogoUpload";
import { CompanyInfoFormData } from "../schema";

interface LogoSectionProps {
  form: UseFormReturn<CompanyInfoFormData>;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

export const LogoSection = ({ form, previewUrl, setPreviewUrl }: LogoSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="logo"
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <LogoUpload
            setValue={form.setValue}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
          />
        </FormItem>
      )}
    />
  );
};
