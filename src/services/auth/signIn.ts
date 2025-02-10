
import { supabase } from "@/integrations/supabase/client";

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const normalizedEmail = email.toLowerCase().trim();
    const trimmedPassword = password.trim();
    
    console.log("Attempting sign in with normalized email:", normalizedEmail);
    
    // Try to sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: trimmedPassword,
    });

    if (signInError) {
      console.error("Sign in error:", signInError);
      
      // Special handling for unconfirmed emails
      if (signInError.message.includes('Email not confirmed')) {
        const { data: resendData, error: resendError } = await supabase.auth.resend({
          email: normalizedEmail,
          type: 'signup'
        });
        
        if (resendError) {
          console.error("Error resending confirmation email:", resendError);
        } else {
          console.log("Confirmation email resent");
        }
      }
      
      throw signInError;
    }

    // If sign in succeeds, verify profile exists
    if (data.user) {
      try {
        console.log("Sign in successful, verifying profile");
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        if (!profile) {
          console.log("No profile found, creating one");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: normalizedEmail,
              role: 'employer',
              name: email.split('@')[0]
            });
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
            throw insertError;
          }
        }
      } catch (profileError) {
        console.error("Profile verification error:", profileError);
        throw profileError;
      }
    }
      
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
