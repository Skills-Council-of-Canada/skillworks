
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
          <div className="min-h-screen bg-background">
            <Index />
            <Toaster />
          </div>
        </ThemeProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen bg-background">
            <Login />
            <Toaster />
          </div>
        </ThemeProvider>
      </AuthProvider>
    ),
  },
  {
    path: "/career-pathways",
    element: (
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="min-h-screen bg-background">
            <CareerPathways />
            <Toaster />
          </div>
        </ThemeProvider>
      </AuthProvider>
    ),
  }
]);
