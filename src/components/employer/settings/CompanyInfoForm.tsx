
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Please enter a valid address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  logo: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), "Max file size is 5MB")
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
    .optional(),
});

type CompanyInfoFormData = z.infer<typeof formSchema>;

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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("logo", file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data: CompanyInfoFormData) => {
    console.log("Starting form submission with data:", data);
    
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
      let logoUrl = null;

      // Handle logo upload if a new file is selected
      if (data.logo instanceof File) {
        console.log("Uploading logo file:", data.logo.name);
        
        const fileExt = data.logo.name.split('.').pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('company-logos')
          .upload(filePath, data.logo);

        if (uploadError) {
          console.error("Error uploading logo:", uploadError);
          throw uploadError;
        }

        console.log("Logo upload successful, getting public URL");

        // Get public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
          .from('company-logos')
          .getPublicUrl(filePath);

        logoUrl = publicUrl;
        console.log("Logo public URL:", logoUrl);
      }

      console.log("Updating employer profile with data:", {
        company_name: data.companyName,
        website: data.website,
        description: data.description,
        primary_contact_phone: data.phone,
        location: data.address,
        ...(logoUrl && { logo_url: logoUrl }),
      });

      // Update employer profile
      const { error: updateError } = await supabase
        .from('employers')
        .update({
          company_name: data.companyName,
          website: data.website,
          description: data.description,
          primary_contact_phone: data.phone,
          location: data.address,
          ...(logoUrl && { logo_url: logoUrl }),
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error("Error updating employer profile:", updateError);
        throw updateError;
      }

      console.log("Profile update successful");

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

  // Load existing employer data when component mounts
  React.useEffect(() => {
    const loadEmployerData = async () => {
      if (!user) return;

      try {
        const { data: employerData, error } = await supabase
          .from('employers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (employerData) {
          form.reset({
            companyName: employerData.company_name || "",
            website: employerData.website || "",
            description: employerData.description || "",
            address: employerData.location || "",
            phone: employerData.primary_contact_phone || "",
          });

          // Set logo preview if exists
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

    loadEmployerData();
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="logo"
          render={({ field: { value, ...field } }) => (
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
                        accept={ACCEPTED_IMAGE_TYPES.join(",")}
                        onChange={handleLogoChange}
                        {...field}
                      />
                    </label>
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
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
