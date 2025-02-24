
import { supabase } from "@/integrations/supabase/client";

export const signOutUser = async () => {
  console.log("Starting signout process");
  try {
    const { error } = await supabase.auth.signOut();
    console.log("Signout successful");
    return { error };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};
