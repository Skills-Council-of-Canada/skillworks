
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import CareerPathways from "@/pages/CareerPathways";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Index />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Login />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/career-pathways",
    element: (
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <CareerPathways />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    ),
  }
]);
