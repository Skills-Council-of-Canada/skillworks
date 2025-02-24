
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
  const navigationInProgress = useRef(false);
  const profileRequestInProgress = useRef(false);
  const lastProfileFetch = useRef<number>(0);
  const FETCH_COOLDOWN = 2000;

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

  const handleNavigation = useCallback((targetPath: string) => {
    if (navigationInProgress.current || location.pathname === targetPath) {
      return;
    }
    navigationInProgress.current = true;
    navigate(targetPath, { replace: true });
    setTimeout(() => {
      navigationInProgress.current = false;
    }, 1000);
  }, [navigate, location.pathname]);

  const handleSession = useCallback(async (session: any | null) => {
    try {
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname)) {
          handleNavigation('/login');
        }
        return;
      }

      const now = Date.now();
      if (now - lastProfileFetch.current < FETCH_COOLDOWN || profileRequestInProgress.current) {
        return;
      }

      profileRequestInProgress.current = true;
      lastProfileFetch.current = now;

      const profile = await getUserProfile(session);
      profileRequestInProgress.current = false;
      
      if (!profile) {
        setUser(null);
        setIsLoading(false);
        if (!isPublicRoute(location.pathname)) {
          handleNavigation('/login');
        }
        return;
      }

      const previousUser = user;
      setUser(profile);
      
      // Only handle navigation if user role has changed or we're on an incorrect route
      if (
        !previousUser || 
        previousUser.role !== profile.role ||
        location.pathname === '/login' || 
        location.pathname === '/' || 
        (!isPublicRoute(location.pathname) && !isCorrectRoleRoute(location.pathname, profile.role))
      ) {
        const targetPath = getRoleBasedRedirect(profile.role);
        console.log('Navigation check:', { 
          from: location.pathname, 
          to: targetPath, 
          role: profile.role 
        });
        handleNavigation(targetPath);
      }

    } catch (error) {
      console.error("Profile error:", error);
      profileRequestInProgress.current = false;
      toast({
        title: "Error",
        description: "Failed to load user profile",
        variant: "destructive",
      });
      setUser(null);
      if (!isPublicRoute(location.pathname)) {
        handleNavigation('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.pathname, isPublicRoute, isCorrectRoleRoute, getRoleBasedRedirect, toast, handleNavigation, user]);

  useEffect(() => {
    let mounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const setupAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted && session) {
          await handleSession(session);
        } else {
          setIsLoading(false);
        }

        authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;

          if (event === 'SIGNED_OUT') {
            setUser(null);
            setIsLoading(false);
            if (!isPublicRoute(location.pathname)) {
              handleNavigation('/login');
            }
            return;
          }

          if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
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
  }, [handleSession, isPublicRoute, location.pathname, handleNavigation, toast]);

  return { user, setUser, isLoading, setIsLoading };
};
