
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Signing out user");
  try {
    // Check current session first
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      console.log("No active session found");
      return { error: null };
    }

    // Try global sign out first
    const { error: globalError } = await supabase.auth.signOut({
      scope: 'global'
    });
    
    if (globalError) {
      console.warn("Global sign out failed:", globalError);
      // Fallback to local sign out
      const { error: localError } = await supabase.auth.signOut({
        scope: 'local'
      });
      
      if (localError) {
        console.error("Local sign out also failed:", localError);
        throw localError;
      }
    }
    
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};
