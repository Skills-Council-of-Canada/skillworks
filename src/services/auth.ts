
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
    const normalizedEmail = email.toLowerCase();
    const name = isDemoAccount 
      ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) + ' User'
      : '';

    // For demo accounts, try signing in first
    if (isDemoAccount) {
      console.log("Attempting to sign in demo account first");
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!signInError && signInData.user) {
        console.log("Demo account exists, signing in");
        return { data: signInData, error: null };
      }
    }

    // If sign in failed or it's not a demo account, create new account
    console.log("Creating new account");
    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          portal,
          name,
        },
      },
    });
    
    if (error) throw error;
    
    if (data.user?.id) {
      console.log("Account created, waiting for profile creation");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verify profile exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
        
      if (!profile) {
        console.log("Creating profile manually");
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: portal,
            name: name || email.split('@')[0]
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const normalizedEmail = email.toLowerCase();
    const isDemoAccount = normalizedEmail.endsWith('@example.com');

    // Try to sign in first
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    // If sign in succeeds, verify profile
    if (!signInError && data.user) {
      console.log("Sign in successful, verifying profile");
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();
          
      if (!profile) {
        console.log("Creating missing profile");
        const portal = normalizedEmail.split('@')[0];
        const name = portal.charAt(0).toUpperCase() + portal.slice(1) + ' User';
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: portal,
            name
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
      }
      
      return { data, error: null };
    }

    // If this is a demo account and sign in failed, try to create it
    if (isDemoAccount && signInError) {
      console.log("Demo account sign in failed, attempting to create account");
      const portal = normalizedEmail.split('@')[0];
      
      const { error: signUpError } = await signUpUser(normalizedEmail, password, portal);
      if (signUpError) throw signUpError;

      // Try signing in again after creating the account
      return supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
    }

    // If not a demo account or other error, throw the original error
    if (signInError) throw signInError;
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
