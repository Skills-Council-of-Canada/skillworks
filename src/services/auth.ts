
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export const getUserProfile = async (session: Session): Promise<User | null> => {
  if (!session?.user) {
    console.log("No session user found in getUserProfile");
    return null;
  }
  
  try {
    console.log("Fetching user profile from profiles table...");
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }

    if (profile) {
      console.log("Profile found:", profile);
      return {
        id: session.user.id,
        email: profile.email,
        role: profile.role as UserRole,
        name: profile.name || profile.email.split('@')[0],
      };
    } else {
      console.log("No profile found for user");
      throw new Error("No profile found for user");
    }
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
};

export const signUpUser = async (email: string, password: string, portal: string) => {
  console.log("Signing up user with portal:", portal);
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          portal,
        },
      },
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  console.log("Signing out user");
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error in signOutUser:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  console.log("Updating user profile:", updates);
  try {
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
