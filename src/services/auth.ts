
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export const getUserProfile = async (session: Session): Promise<User | null> => {
  if (!session?.user) {
    console.log("No session user found in getUserProfile");
    return null;
  }
  
  try {
    console.log("Fetching user profile for ID:", session.user.id);
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, email, role, name')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }

    if (!profile) {
      console.log("No profile found for user");
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role as UserRole,
      name: profile.name,
    };
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
};

export const signUpUser = async (email: string, password: string, portal: string) => {
  console.log("Signing up user with portal:", portal);
  try {
    // For demo accounts, we'll create them with a standard name based on their role
    const isDemoAccount = email.toLowerCase().endsWith('@example.com');
    let name = '';
    
    if (isDemoAccount) {
      const role = email.split('@')[0];
      name = role.charAt(0).toUpperCase() + role.slice(1) + ' User';
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          portal,
          name,
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
    // If this is a demo account and it doesn't exist, create it first
    const isDemoAccount = email.toLowerCase().endsWith('@example.com');
    if (isDemoAccount) {
      const { data: { user } } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password,
        options: {
          data: {
            portal: email.split('@')[0], // Use the part before @ as the portal/role
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) + ' User',
          },
        },
      });
      
      // If the user was just created, we need to wait a moment for the profile to be created
      if (user?.id) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });
    
    if (error) throw error;
    console.log("Sign in successful, session:", data.session);
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
