
import { supabase } from "@/integrations/supabase/client";
import { User, UserRole } from "@/types/auth";

const usernameToEmail: Record<string, string> = {
  employ: "employer@skillscouncil.ca",
  employer: "employer@skillscouncil.ca",
  educator: "educator@skillscouncil.ca",
  participate: "participate@skillscouncil.ca",
  participant: "participant@skillscouncil.ca",
  admin: "admin@skillscouncil.ca"
};

// Map emails to roles
const emailToRole: Record<string, UserRole> = {
  "employer@skillscouncil.ca": "employer",
  "educator@skillscouncil.ca": "educator",
  "participate@skillscouncil.ca": "participant",
  "participant@skillscouncil.ca": "participant",
  "admin@skillscouncil.ca": "admin"
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
      role = emailToRole[email];
      console.log("Email login - determined role:", role);
    } else {
      // Handle username lookup
      const username = identifier.toLowerCase();
      email = usernameToEmail[username];
      role = usernameToRole[username];
      console.log("Username login - determined role:", role);

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
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') { // PGRST116 means no rows returned
        console.error("Error fetching profile:", profileError);
        return { data: null, error: profileError };
      }

      // If no profile exists, create one
      if (!profile && role) {
        console.log("No profile found, creating new profile with role:", role);
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: email,
            role: role,
            name: email.split('@')[0],
            status: 'pending',
            avatar_url: null,
            bio: null,
            phone: null,
            preferred_contact: 'email'
          })
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          return { data: null, error: createError };
        }

        profile = newProfile;
        console.log("Created new profile:", profile);
      }

      if (!profile) {
        return { data: null, error: new Error("Could not find or create user profile") };
      }

      console.log("Returning user data with profile:", { ...authData.user, ...profile });
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
