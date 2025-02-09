
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
      return null;
    }

    if (profile) {
      console.log("Profile found:", profile);
      return {
        id: session.user.id,
        email: profile.email,
        role: profile.role as UserRole,
        name: profile.name || "User",
      };
    } else {
      console.log("No profile found for user");
    }
  } catch (error) {
    console.error("Error in getUserProfile:", error);
  }
  
  return null;
};

export const signUpUser = async (email: string, password: string, portal: string) => {
  console.log("Signing up user with portal:", portal);
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        portal: portal,
      },
    },
  });
};

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOutUser = async () => {
  console.log("Signing out user");
  return supabase.auth.signOut();
};
