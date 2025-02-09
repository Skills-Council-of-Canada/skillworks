
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Starting signout process");
  try {
    // Clear any persisted session data first
    localStorage.clear();
    sessionStorage.clear();
    
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut({
      scope: 'local'
    });
    
    if (error) {
      console.error("Error during signout:", error);
      throw error;
    }
    
    console.log("Signout successful");
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};
