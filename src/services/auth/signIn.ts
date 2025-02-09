
import { supabase } from "@/integrations/supabase/client";

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const normalizedEmail = email.toLowerCase();
    const isDemoAccount = normalizedEmail.endsWith('@example.com') || normalizedEmail.endsWith('@skillscouncil.ca');

    // Try to sign in first
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    // If sign in succeeds, verify profile
    if (!signInError && data.user) {
      console.log("Sign in successful, verifying profile");
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', data.user.id)
        .maybeSingle();
          
      if (!profile) {
        console.log("Creating missing profile");
        // For demo accounts, determine role
        let role = 'participant';
        let name = 'Participant User';
        
        // Explicitly set employer role for employer@skillscouncil.ca
        if (normalizedEmail === 'employer@skillscouncil.ca') {
          console.log("Setting employer role for employer@skillscouncil.ca");
          role = 'employer';
          name = 'Employer User';
        }
        // Explicitly set educator role for educator@skillscouncil.ca
        else if (normalizedEmail === 'educator@skillscouncil.ca') {
          console.log("Setting educator role for educator@skillscouncil.ca");
          role = 'educator';
          name = 'Educator User';
        }
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: role,
            name
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
      }
      
      return { data, error: null };
    }

    // If this is a demo account and sign in failed with invalid credentials (not user exists), try to create it
    if (isDemoAccount && signInError?.message === "Invalid login credentials") {
      console.log("Demo account sign in failed with invalid credentials, attempting to create account");
      let role = 'participant';
      let name = 'Participant User';
      
      if (normalizedEmail === 'employer@skillscouncil.ca') {
        role = 'employer';
        name = 'Employer User';
      } else if (normalizedEmail === 'educator@skillscouncil.ca') {
        role = 'educator';
        name = 'Educator User';
      }
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            portal: role,
            name
          }
        }
      });
      
      if (signUpError) throw signUpError;

      // Try signing in again after creating the account
      return supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
    }

    // If not a demo account or other error, throw the original error
    if (signInError) throw signInError;
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
