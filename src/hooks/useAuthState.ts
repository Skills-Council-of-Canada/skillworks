
import React, { useState, useEffect, useCallback, useRef } from "react";
import { User } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserProfile } from "@/services/auth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { getRoleBasedRedirect } = useAuthRedirect();
  const navigationRef = useRef(false);
  const authCheckCompleted = useRef(false);

  // Cache profile data in memory
  const profileCache = new Map<string, User>();

  const isPublicRoute = useCallback((path: string) => {
    if (path.includes('/registration')) {
      return true;
    }
    
    const publicPaths = [
      '/login',
      '/employer-landing',
      '/educator-landing',
      '/participant-landing',
      '/'
    ];
    return publicPaths.includes(path) || publicPaths.some(prefix => path.startsWith(prefix + '?'));
  }, []);

  const isCorrectRoleRoute = useCallback((path: string, userRole: string) => {
    const rolePaths = {
      admin: '/admin',
      participant: '/participant',
      employer: '/employer',
      educator: '/educator'
    };

    return path.startsWith(rolePaths[userRole as keyof typeof rolePaths]);
  }, []);

  const handleSession = useCallback(async (session: any | null) => {
    try {
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname) && !navigationRef.current) {
          navigationRef.current = true;
          navigate('/login', { replace: true });
        }
        return;
      }

      let profile = profileCache.get(session.user.id);
      
      if (!profile) {
        profile = await getUserProfile(session);
        if (profile) {
          profileCache.set(session.user.id, profile);
        }
      }

      if (!profile) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname) && !navigationRef.current) {
          navigationRef.current = true;
          navigate('/login', { replace: true });
        }
        return;
      }

      setUser(profile);
      
      if ((location.pathname === '/login' || 
          location.pathname === '/' || 
          (!isPublicRoute(location.pathname) && !isCorrectRoleRoute(location.pathname, profile.role))) && 
          !navigationRef.current) {
        navigationRef.current = true;
        navigate(getRoleBasedRedirect(profile.role), { replace: true });
      }
    } catch (error) {
      console.error("Profile error:", error);
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
      setUser(null);
      if (!isPublicRoute(location.pathname) && !navigationRef.current) {
        navigationRef.current = true;
        navigate('/login', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname, isPublicRoute, isCorrectRoleRoute, getRoleBasedRedirect, toast]);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session) {
          await handleSession(session);
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          console.log("Auth state change:", event, session);

          if (event === 'SIGNED_OUT') {
            setUser(null);
            profileCache.clear();
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              navigate('/login', { replace: true });
            }
            return;
          }

          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            await handleSession(session);
          }
        }).data.subscription;

      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "There was a problem with the authentication service",
            variant: "destructive",
          });
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    setupAuth();

    return () => {
      mounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [handleSession]);

  return { user, setUser, isLoading, setIsLoading };
};
