
import { supabase } from "@/integrations/supabase/client";

const usernameToEmail: Record<string, string> = {
  employ: "employ@skillscouncil.ca",
  educator: "educator@skillscouncil.ca",
  participate: "participate@skillscouncil.ca",
  admin: "admin@skillscouncil.ca"
};

export const signInUser = async (username: string, password: string) => {
  console.log("Signing in user:", username);
  try {
    const email = usernameToEmail[username.toLowerCase()];
    if (!email) {
      return { 
        data: null, 
        error: new Error("Invalid username. Please use: employ, educator, participate, or admin") 
      };
    }
    
    console.log("Using email for login:", email);
    
    // Try to sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: password.trim(),
    });

    if (signInError) {
      console.error("Sign in error:", signInError);
      return { data: null, error: signInError };
    }

    // If sign in succeeds, get profile
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
