
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aklgkijeuuyvnwhdbhzw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrbGdraWpldXV5dm53aGRiaHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNDg4ODEsImV4cCI6MjA1NDYyNDg4MX0.mqN41bCnSL6QyGnrcgPlcTjFA4ZajmOR4oNMnJNEKEo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  }
});

