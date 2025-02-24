
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Starting signout process");
  try {
    await supabase.auth.signOut();
    console.log("Signout successful");
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};
