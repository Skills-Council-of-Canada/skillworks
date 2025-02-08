
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { UserRole } from "@/types/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roleBasedRedirect = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "employer":
      return "/employer";
    case "educator":
      return "/educator";
    case "participant":
      return "/";
    default:
      return "/";
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    if (user) {
      const redirectPath = roleBasedRedirect(user.role);
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSigningUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary mb-2">Welcome</h2>
          <p className="text-secondary/60">Sign in to your account or create a new one</p>
        </div>

        <Card className="p-6 bg-white shadow-lg border-0">
          <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setIsSigningUp(value === "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {isSigningUp ? "Sign Up" : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-secondary/60">
          Demo accounts: admin@example.com, educator@example.com,
          employer@example.com, participant@example.com
          <br />
          (Use any password)
        </p>
      </div>
    </div>
  );
};

export default Login;
