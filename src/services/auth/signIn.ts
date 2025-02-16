
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

export const signInUser = async (identifier: string, password: string) => {
  console.log("Attempting to sign in with identifier:", identifier);
  try {
    // Always convert email to lowercase to ensure consistent handling
    const email = identifier.toLowerCase();
    
    console.log("Attempting sign in with email:", email);
    
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Sign in error:", signInError);
      
      // Handle specific error cases
      if (signInError.message.includes('Invalid login credentials')) {
        return { 
          data: null, 
          error: new Error("Invalid email or password. Please check your credentials and try again.")
        };
      }
      
      if (signInError.message.includes('Email not confirmed')) {
        return {
          data: null,
          error: new Error("Please verify your email address before logging in.")
        };
      }

      return { data: null, error: signInError };
    }

    if (!authData?.user) {
      console.error("No auth data returned from sign in");
      return { 
        data: null, 
        error: new Error("No authentication data returned")
      };
    }

    // Get the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return { 
        data: null, 
        error: new Error("Error fetching user profile. Please try again.")
      };
    }

    if (!profile) {
      console.error("No profile found for user:", authData.user.id);
      return { 
        data: null, 
        error: new Error("No user profile found. Please contact support.")
      };
    }

    const user: User = {
      id: profile.id,
      email: profile.email,
      role: profile.role as UserRole,
      name: profile.name
    };

    console.log("Login successful with profile:", user);
    return { data: { user }, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
