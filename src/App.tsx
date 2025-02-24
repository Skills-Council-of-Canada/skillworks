
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={routes} />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
