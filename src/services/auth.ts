
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
    const isDemoAccount = email.toLowerCase().endsWith('@example.com');
    let name = '';
    
    if (isDemoAccount) {
      const role = email.split('@')[0];
      name = role.charAt(0).toUpperCase() + role.slice(1) + ' User';
    }

    const { data: { user }, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          portal,
          name,
        },
      },
    });
    
    if (error) throw error;
    
    // Wait for profile creation if this is a new user
    if (user?.id) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verify profile was created
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();
        
      if (!profile) {
        throw new Error("Profile creation failed");
      }
    }

    return { data: { user }, error: null };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    // First try to sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    // If sign in succeeds, return the result
    if (!signInError) {
      console.log("Sign in successful");
      
      // Verify profile exists
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle();
          
        if (!profile) {
          console.log("No profile found, attempting to create one");
          await signUpUser(email, password, email.split('@')[0]);
        }
      }
      
      return { data, error: null };
    }

    // If this is a demo account and sign in failed, try to create it first
    const isDemoAccount = email.toLowerCase().endsWith('@example.com');
    if (isDemoAccount && signInError) {
      console.log("Demo account sign in failed, attempting to create account");
      const role = email.split('@')[0];
      
      const { error: signUpError } = await signUpUser(email, password, role);
      if (signUpError) throw signUpError;

      // Try signing in again after creating the account
      const { data: newData, error: newError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (newError) throw newError;
      return { data: newData, error: null };
    }

    // If not a demo account or other error, throw the original error
    throw signInError;
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
