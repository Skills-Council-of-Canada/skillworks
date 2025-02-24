
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Starting signout process");
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error in signOutUser:", error);
      throw error;
    }
    console.log("Signout successful");
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};
