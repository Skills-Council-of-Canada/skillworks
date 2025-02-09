
import { supabase } from "@/integrations/supabase/client";

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const normalizedEmail = email.toLowerCase();
    const isDemoAccount = normalizedEmail.endsWith('@example.com') || normalizedEmail.endsWith('@skillscouncil.ca');

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
        .select('id, role')
        .eq('id', data.user.id)
        .maybeSingle();
          
      if (!profile) {
        console.log("Creating missing profile");
        // For demo accounts, determine role
        let role = 'participant';
        let name = 'Participant User';
        
        // Explicitly set employer role for employer@skillscouncil.ca
        if (normalizedEmail === 'employer@skillscouncil.ca') {
          console.log("Setting employer role for employer@skillscouncil.ca");
          role = 'employer';
          name = 'Employer User';
        }
        // Explicitly set educator role for educator@skillscouncil.ca
        else if (normalizedEmail === 'educator@skillscouncil.ca') {
          console.log("Setting educator role for educator@skillscouncil.ca");
          role = 'educator';
          name = 'Educator User';
        }
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: role,
            name
          });
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }

        // Ensure the profile was created with the correct role for special accounts
        if (normalizedEmail === 'employer@skillscouncil.ca' || normalizedEmail === 'educator@skillscouncil.ca') {
          const correctRole = normalizedEmail === 'employer@skillscouncil.ca' ? 'employer' : 'educator';
          console.log(`Ensuring correct role (${correctRole}) for ${normalizedEmail}`);
          
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: correctRole })
            .eq('id', data.user.id);
            
          if (updateError) {
            console.error(`Error updating ${correctRole} role:`, updateError);
            throw updateError;
          }
        }
      } else if (normalizedEmail === 'educator@skillscouncil.ca' && profile.role !== 'educator') {
        // Force update role to educator if it's somehow incorrect
        console.log("Correcting role to educator for educator@skillscouncil.ca");
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'educator' })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error("Error updating educator role:", updateError);
          throw updateError;
        }
      } else if (normalizedEmail === 'employer@skillscouncil.ca' && profile.role !== 'employer') {
        // Force update role to employer if it's somehow incorrect
        console.log("Correcting role to employer for employer@skillscouncil.ca");
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'employer' })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error("Error updating employer role:", updateError);
          throw updateError;
        }
      }
      
      return { data, error: null };
    }

    // If this is a demo account and sign in failed, try to create it
    if (isDemoAccount && signInError) {
      console.log("Demo account sign in failed, attempting to create account");
      let role = 'participant';
      let name = 'Participant User';
      
      if (normalizedEmail === 'employer@skillscouncil.ca') {
        role = 'employer';
        name = 'Employer User';
      } else if (normalizedEmail === 'educator@skillscouncil.ca') {
        role = 'educator';
        name = 'Educator User';
      }
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            portal: role,
            name
          }
        }
      });
      
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
