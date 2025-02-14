
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

const usernameToEmail: Record<string, string> = {
  employ: "employ@skillscouncil.ca",
  employer: "employ@skillscouncil.ca", // Add alias for employer
  educator: "educator@skillscouncil.ca",
  participate: "participate@skillscouncil.ca",
  participant: "participate@skillscouncil.ca", // Add alias for participant
  admin: "admin@skillscouncil.ca"
};

// Map usernames to roles
const usernameToRole: Record<string, UserRole> = {
  employ: "employer",
  employer: "employer",
  educator: "educator",
  participate: "participant",
  participant: "participant",
  admin: "admin"
};

export const signInUser = async (identifier: string, password: string) => {
  console.log("Signing in user with identifier:", identifier);
  try {
    // Check if the identifier is an email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    
    let email: string;
    let role: UserRole | undefined;
    
    if (isEmail) {
      email = identifier.toLowerCase();
      // Try to determine role from email domain or handle as needed
      role = Object.entries(usernameToEmail).find(([_, e]) => e === email)?.[0] as UserRole;
    } else {
      // Handle username lookup
      const username = identifier.toLowerCase();
      email = usernameToEmail[username];
      role = usernameToRole[username];

      if (!email || !role) {
        return { 
          data: null, 
          error: new Error("Invalid username. Please use: employer/employ, educator, participate/participant, or admin") 
        };
      }
    }
    
    console.log("Using email for login:", email);
    console.log("Determined role:", role);
    
    // Try to sign in
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: password.trim(),
    });

    if (signInError) {
      console.error("Sign in error:", signInError);
      return { data: null, error: signInError };
    }

    // If sign in succeeds, get or create profile
    if (authData.user) {
      console.log("Sign in successful, checking profile for user:", authData.user.id);
      
      // First try to get existing profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error("Error fetching profile:", profileError);
        return { data: null, error: profileError };
      }

      // If no profile exists, create one
      if (!profile) {
        console.log("No profile found, creating new profile with role:", role);
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            email: email,
            role: role,
            name: email.split('@')[0]
          }])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          return { data: null, error: createError };
        }

        console.log("Created new profile:", newProfile);
        return { 
          data: {
            user: {
              ...authData.user,
              ...newProfile
            }
          }, 
          error: null 
        };
      }

      console.log("Found existing profile:", profile);
      return { 
        data: {
          user: {
            ...authData.user,
            ...profile
          }
        }, 
        error: null 
      };
    }
      
    return { data: null, error: new Error("No user data returned from authentication") };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
