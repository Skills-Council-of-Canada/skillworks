
import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

// Add debouncing for error handling
let lastErrorTime = 0;
const ERROR_DEBOUNCE_MS = 2000; // Only show error every 2 seconds

export const getUserProfile = async (session: Session): Promise<User | null> => {
  if (!session?.user) {
    console.log("No session user found in getUserProfile");
    return null;
  }
  
  try {
    console.log("Fetching profile for ID:", session.user.id);
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, email, role, name')
      .eq('id', session.user.id)
      .single();

    if (error) {
      // Only log/throw error if enough time has passed since last error
      const now = Date.now();
      if (now - lastErrorTime > ERROR_DEBOUNCE_MS) {
        console.error("Error fetching user profile:", error);
        lastErrorTime = now;
        throw error;
      }
      return null;
    }

    if (!profile) {
      console.log("No profile found for user");
      return null;
    }

    console.log("Profile data retrieved:", profile);
    return {
      id: profile.id,
      email: profile.email,
      role: profile.role as User['role'],
      name: profile.name,
    };
  } catch (error) {
    const now = Date.now();
    if (now - lastErrorTime > ERROR_DEBOUNCE_MS) {
      console.error("Error in getUserProfile:", error);
      lastErrorTime = now;
      throw error;
    }
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      console.error("No valid session for profile update");
      throw new Error("No active session");
    }

    console.log("Updating user profile:", updates);
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
};
