
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export const getUserProfile = async (session: Session): Promise<User | null> => {
  if (!session?.user) return null;
  
  try {
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
      return {
        id: session.user.id,
        email: profile.email,
        role: profile.role as UserRole,
        name: profile.name || "User",
      };
    }
  } catch (error) {
    console.error("Error in getUserProfile:", error);
  }
  
  return null;
};

export const signUpUser = async (email: string, password: string, portal: string) => {
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
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOutUser = async () => {
  return supabase.auth.signOut();
};
