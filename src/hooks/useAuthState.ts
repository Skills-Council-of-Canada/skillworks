
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
  const lastNavigation = useRef<string | null>(null);
  const profileRequestInProgress = useRef(false);
  const mounted = useRef(true);

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
    // Check if the user is already on their dashboard
    if (path === `/${userRole}/dashboard`) {
      console.log("User is on correct dashboard path:", path);
      return true;
    }

    const rolePaths = {
      admin: '/admin',
      participant: '/participant',
      employer: '/employer',
      educator: '/educator'
    };

    const isCorrectPath = path.startsWith(rolePaths[userRole as keyof typeof rolePaths]);
    console.log("Path check result:", { path, userRole, isCorrectPath });
    return isCorrectPath;
  }, []);

  const handleSession = useCallback(async (session: any | null) => {
    if (!mounted.current) return;
    
    try {
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname)) {
          const targetPath = '/login';
          if (lastNavigation.current !== targetPath) {
            lastNavigation.current = targetPath;
            navigate(targetPath, { replace: true });
          }
        }
        return;
      }

      if (profileRequestInProgress.current) {
        return;
      }

      profileRequestInProgress.current = true;
      const profile = await getUserProfile(session);
      profileRequestInProgress.current = false;
      
      if (!mounted.current) {
        return;
      }

      if (!profile) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname)) {
          const targetPath = '/login';
          if (lastNavigation.current !== targetPath) {
            lastNavigation.current = targetPath;
            navigate(targetPath, { replace: true });
          }
        }
        return;
      }

      setUser(profile);
      
      // Only redirect if we're not on a public route and not on the correct role route
      const shouldRedirect = !isPublicRoute(location.pathname) && 
                           !isCorrectRoleRoute(location.pathname, profile.role);
      
      console.log("Redirect check:", {
        pathname: location.pathname,
        isPublic: isPublicRoute(location.pathname),
        isCorrectRole: isCorrectRoleRoute(location.pathname, profile.role),
        shouldRedirect
      });

      if (shouldRedirect) {
        const targetPath = getRoleBasedRedirect(profile.role);
        if (lastNavigation.current !== targetPath) {
          console.log('Navigating to:', targetPath);
          lastNavigation.current = targetPath;
          navigate(targetPath, { replace: true });
        }
      } else {
        console.log('No redirect needed, user is in correct location');
      }

    } catch (error) {
      console.error("Profile error:", error);
      if (mounted.current) {
        toast({
          title: "Error",
          description: "Failed to load user profile",
          variant: "destructive",
        });
        setUser(null);
      }
    } finally {
      if (mounted.current) {
        setIsLoading(false);
      }
    }
  }, [navigate, location.pathname, isPublicRoute, isCorrectRoleRoute, getRoleBasedRedirect, toast]);

  useEffect(() => {
    mounted.current = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted.current && session) {
          await handleSession(session);
        } else if (mounted.current) {
          setIsLoading(false);
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted.current) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              const targetPath = '/login';
              if (lastNavigation.current !== targetPath) {
                lastNavigation.current = targetPath;
                navigate(targetPath, { replace: true });
              }
            }
            return;
          }

          if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
            await handleSession(session);
          }
        }).data.subscription;

      } catch (error) {
        console.error("Error in setupAuth:", error);
        if (mounted.current) {
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
      mounted.current = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [handleSession, isPublicRoute, location.pathname, navigate, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
