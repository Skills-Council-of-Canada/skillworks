
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

    // If sign in succeeds, get the profile
    if (authData.user) {
      console.log("Sign in successful, getting profile for user:", authData.user.id);
      
      // Get the profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return { data: null, error: profileError };
      }

      if (!profile) {
        console.error("No profile found for user:", authData.user.id);
        return { data: null, error: new Error("No profile found for user") };
      }

      const user: User = {
        id: profile.id,
        email: profile.email,
        role: profile.role as UserRole,
        name: profile.name
      };

      console.log("Login successful with profile:", user);
      return { data: { user }, error: null };
    }
      
    return { data: null, error: new Error("No user data returned from authentication") };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
