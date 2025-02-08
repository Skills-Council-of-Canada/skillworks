
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { LogoUpload } from "./LogoUpload";
import { formSchema, type CompanyInfoFormData } from "./schema";
import { loadEmployerData, updateEmployerProfile } from "./companyService";

interface CompanyInfoFormProps {
  onUpdate: () => void;
}

const CompanyInfoForm = ({ onUpdate }: CompanyInfoFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<CompanyInfoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      website: "",
      description: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (data: CompanyInfoFormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update company information",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      await updateEmployerProfile(user.id, data, data.logo instanceof File ? data.logo : undefined);
      
      toast({
        title: "Success",
        description: "Company information updated successfully",
      });

      onUpdate();
    } catch (error) {
      console.error('Error updating company info:', error);
      toast({
        title: "Error",
        description: "Failed to update company information",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const employerData = await loadEmployerData(user.id);

        if (employerData) {
          form.reset({
            companyName: employerData.company_name || "",
            website: employerData.website || "",
            description: employerData.description || "",
            address: employerData.location || "",
            phone: employerData.primary_contact_phone || "",
          });

          if (employerData.logo_url) {
            setPreviewUrl(employerData.logo_url);
          }
        }
      } catch (error) {
        console.error('Error loading employer data:', error);
        toast({
          title: "Error",
          description: "Failed to load company information",
          variant: "destructive",
        });
      }
    };

    loadData();
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="logo"
          render={({ field: { value, ...field } }) => (
            <LogoUpload
              setValue={form.setValue}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter company description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter company address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUploading}>
          {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUploading ? "Uploading..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyInfoForm;

