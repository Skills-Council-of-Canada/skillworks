
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
      throw signInError;
    }

    // If sign in succeeds, verify profile exists but handle errors gracefully
    if (data.user) {
      try {
        console.log("Sign in successful, verifying profile");
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('id', data.user.id)
          .single();
          
        if (!profile) {
          console.log("Creating missing profile");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: normalizedEmail,
              role: 'participant', // Default role if none specified
              name: email.split('@')[0]
            });
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
            // Continue even if profile creation fails - don't block login
          }
        }
      } catch (profileError) {
        console.error("Profile verification error:", profileError);
        // Continue even if profile check fails - don't block login
      }
    }
      
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
