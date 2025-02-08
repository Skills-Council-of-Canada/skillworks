
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

  // Check if employer record exists
  const { data: existingEmployer } = await supabase
    .from('employers')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();

  if (existingEmployer) {
    // Update existing record
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
  } else {
    // Create new record
    const { error: insertError } = await supabase
      .from('employers')
      .insert({
        user_id: userId,
        company_name: data.companyName,
        website: data.website,
        description: data.description,
        primary_contact_phone: data.phone,
        location: data.address,
        ...(logoUrl && { logo_url: logoUrl }),
        // Set required fields with default values
        industry: 'Other', // Default value
        company_size: 'Not specified', // Default value
        primary_contact_name: 'Not specified', // Default value
        primary_contact_email: 'Not specified', // Default value
      });

    if (insertError) {
      console.error("Error creating employer profile:", insertError);
      throw insertError;
    }
  }

  return { logoUrl };
};

export const loadEmployerData = async (userId: string) => {
  const { data: employerData, error } = await supabase
    .from('employers')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error("Error loading employer data:", error);
    throw error;
  }

  return employerData;
};
