
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/auth";

export const signUpUser = async (email: string, password: string, role: UserRole) => {
  console.log("Signing up user with role:", role);
  try {
    const normalizedEmail = email.toLowerCase();
    
    // Create new account
    console.log("Creating new account");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          role,
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
            role: role,
            name: "Admin" // Set a default name for admin
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
