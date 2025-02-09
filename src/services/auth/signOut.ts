
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Starting signout process");
  try {
    // Clear any persisted session data first
    localStorage.clear();
    sessionStorage.clear();
    
    // Sign out from Supabase with both local and global scope
    await supabase.auth.signOut();
    
    console.log("Signout successful");
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};

