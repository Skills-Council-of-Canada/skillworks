
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfoFormData } from "./schema";

export const updateEmployerProfile = async (
  userId: string,
  data: CompanyInfoFormData,
  logoFile?: File
) => {
  let logoUrl = null;

  if (logoFile) {
    const fileExt = logoFile.name.split('.').pop();
    const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('company-logos')
      .upload(filePath, logoFile);

    if (uploadError) {
      console.error("Error uploading logo:", uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath);

    logoUrl = publicUrl;
  }

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
    .eq('user_id', userId);

  if (updateError) {
    console.error("Error updating employer profile:", updateError);
    throw updateError;
  }

  return { logoUrl };
};

export const loadEmployerData = async (userId: string) => {
  const { data: employerData, error } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  return employerData;
};

