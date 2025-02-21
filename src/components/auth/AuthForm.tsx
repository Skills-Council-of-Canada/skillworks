
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  icon?: LucideIcon;
  title?: string;
  gradient?: string;
  isLoading?: boolean;
  onBack: () => void;
  onSubmit?: (email: string, password: string, isSignUp: boolean) => Promise<void>;
}

const AuthForm = ({
  gradient = "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
  isLoading = false,
  onBack,
  onSubmit = async () => {},
}: AuthFormProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    
    setError(null);

    try {
      await onSubmit(identifier, password, false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (resetLoading) return;

    setError(null);
    setResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(identifier, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetEmailSent(true);
      toast({
        title: "Check your email",
        description: "If you have an account with Skill Works, you will receive an email to change your password.",
      });
    } catch (err) {
      console.error("Reset password error:", err);
      // Don't show specific errors to avoid revealing if an email exists
      setResetEmailSent(true);
    } finally {
      setResetLoading(false);
    }
  };

  if (isResetMode) {
    return (
      <div className={`w-full max-w-md space-y-8 animate-fadeIn`}>
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
          <p className="text-secondary/60">Enter your email to reset your password</p>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-background/50"
                required
              />
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={resetLoading}
              >
                {resetLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send Reset Instructions"
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setIsResetMode(false)}
              >
                Back to Login
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md space-y-8 animate-fadeIn`}>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-primary">Login</h1>
        <p className="text-secondary/60">Sign in to your account</p>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-xl">
        <Tabs defaultValue="login" className="w-full">
          <TabsContent value="login" className="mt-0">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary">Email or Username</label>
                <Input
                  type="text"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-background/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-secondary">Password</label>
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-sm text-blue-500 hover:text-blue-600"
                    onClick={() => setIsResetMode(true)}
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background/50 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-background/80"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-secondary" />
                    ) : (
                      <Eye className="h-4 w-4 text-secondary" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForm;
