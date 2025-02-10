
import { supabase } from "@/integrations/supabase/client";

export const signUpUser = async (email: string, password: string, portal: string) => {
  console.log("Signing up user with portal:", portal);
  try {
    const isDemoAccount = email.toLowerCase().endsWith('@example.com') || 
                         email.toLowerCase().endsWith('@skillscouncil.ca');
    const normalizedEmail = email.toLowerCase();
    const name = isDemoAccount 
      ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) + ' User'
      : '';

    // For demo accounts, try signing in first
    if (isDemoAccount) {
      console.log("Attempting to sign in demo account first");
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!signInError && signInData.user) {
        console.log("Demo account exists, signing in");
        return { data: signInData, error: null };
      }
    }

    // If sign in failed or it's not a demo account, create new account
    console.log("Creating new account");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          portal,
          name,
        },
      },
    });
    
    if (error) {
      console.error("Signup error:", error);
      throw error;
    }
    
    // Give some time for the trigger to create the profile
    if (data.user?.id) {
      console.log("Account created, waiting for profile creation");
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
        
      if (!profile) {
        console.log("Creating profile manually");
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: portal,
            name: name || email.split('@')[0]
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
};
