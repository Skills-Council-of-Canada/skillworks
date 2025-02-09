
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Signing out user");
  try {
    // First clear any stored session data
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error during signout:", error);
      throw error;
    }
    
    // Clear any local storage or state that might be persisting
    localStorage.removeItem('supabase.auth.token');
    
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};

