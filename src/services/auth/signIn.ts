
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

export const signInUser = async (identifier: string, password: string) => {
  console.log("Attempting to sign in with identifier:", identifier);
  try {
    // Check if the identifier is an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const email = isEmail ? identifier.toLowerCase() : identifier.toLowerCase();
    
    console.log("Attempting sign in with email:", email);
    
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Sign in error:", signInError);
      return { data: null, error: signInError };
    }

    // If sign in succeeds, wait a moment for the trigger to create the profile
    if (authData.user) {
      console.log("Sign in successful for user:", authData.user.id);
      
      // Add a small delay to allow the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then try to get the profile
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return { data: null, error: profileError };
      }

      if (!profile) {
        console.log("No profile found, creating one");
        // If no profile exists, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            email: authData.user.email,
            role: 'participant',
            name: authData.user.email?.split('@')[0] || 'User'
          }])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          return { data: null, error: createError };
        }
        profile = newProfile;
      }

      console.log("Returning user data with profile:", { ...authData.user, ...profile });
      return { 
        data: {
          user: {
            ...authData.user,
            ...profile
          }
        }, 
        error: null 
      };
    }
      
    return { data: null, error: new Error("No user data returned from authentication") };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
