
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
        console.log("Attempting to resend confirmation email");
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: normalizedEmail
        });
        
        if (resendError) {
          console.error("Error resending confirmation email:", resendError);
        } else {
          console.log("Confirmation email resent successfully");
        }
      }
      
      return { data: null, error: signInError };
    }

    // If sign in succeeds, get profile but don't create if missing
    if (data.user) {
      console.log("Sign in successful, checking profile for user:", data.user.id);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error("Error fetching profile:", profileError);
      }

      console.log("Profile data:", profile);
    }
      
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
