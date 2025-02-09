
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Signing out user");
  try {
    // First check if we have a session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found, considering user already logged out");
      return { error: null };
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};

