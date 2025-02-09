
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Signing out user");
  try {
    // Sign out from both server and locally
    const { error } = await supabase.auth.signOut({
      scope: 'global'
    });
    
    if (error) {
      console.error("Error in signOutUser:", error);
      // Even if server-side logout fails, clear local session
      await supabase.auth.signOut({ scope: 'local' });
    }
    
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    // Ensure local session is cleared even if there's an error
    await supabase.auth.signOut({ scope: 'local' });
    throw error;
  }
};
