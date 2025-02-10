
import { supabase } from "@/integrations/supabase/client";

export const signInUser = async (email: string, password: string) => {
  console.log("Signing in user:", email);
  try {
    const normalizedEmail = email.toLowerCase();
    const isDemoAccount = normalizedEmail.endsWith('@example.com') || 
                         normalizedEmail.endsWith('@skillscouncil.ca');
    
    // Use demo password for demo accounts if no password provided
    const finalPassword = isDemoAccount && !password ? "demo123" : password;
    
    // Try to sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: finalPassword,
    });

    if (signInError) {
      // For demo accounts, try with the default password
      if (isDemoAccount && password !== "demo123") {
        console.log("Demo account login failed, trying with default password");
        const { data: demoData, error: demoError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: "demo123",
        });
        
        if (demoError) {
          console.error("Demo account login failed:", demoError);
          throw demoError;
        }
        
        return { data: demoData, error: null };
      }
      
      console.error("Sign in error:", signInError);
      throw signInError;
    }

    // If sign in succeeds, verify profile exists
    if (data.user) {
      console.log("Sign in successful, verifying profile");
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', data.user.id)
        .maybeSingle();
          
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw profileError;
      }

      if (!profile) {
        console.log("Creating missing profile");
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: normalizedEmail,
            role: isDemoAccount ? 'admin' : 'participant',
            name: isDemoAccount ? 'Admin User' : email.split('@')[0]
          });
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
          throw insertError;
        }
      }
    }
      
    return { data, error: null };
  } catch (error) {
    console.error("Error in signInUser:", error);
    throw error;
  }
};
