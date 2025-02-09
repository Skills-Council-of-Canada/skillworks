
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthFormProps {
  icon: LucideIcon;
  title: string;
  gradient: string;
  isLoading: boolean;
  onBack: () => void;
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
}

const DEMO_ACCOUNTS = [
  'admin@example.com',
  'educator@example.com',
  'employer@example.com',
  'participant@example.com'
];

const AuthForm = ({
  icon: Icon,
  title,
  gradient,
  isLoading,
  onBack,
  onSubmit,
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // For demo accounts, use a standard password
    if (DEMO_ACCOUNTS.includes(email)) {
      try {
        await onSubmit(email, "demo123", isSigningUp);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
      return;
    }

    try {
      await onSubmit(email, password, isSigningUp);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={`w-full max-w-md space-y-8 animate-fadeIn`}>
      <div className="text-center">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portal Selection
        </Button>
        <div className="flex flex-col items-center gap-4">
          <Icon className="h-16 w-16 text-primary" />
          <h2 className="text-4xl font-bold text-secondary">{title}</h2>
          <p className="text-secondary/60">Sign in to your account or create a new one</p>
        </div>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-xl border-0">
        <Tabs defaultValue="login" className="w-full" onValueChange={(value) => setIsSigningUp(value === "signup")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-secondary">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background/50 pr-10"
                  required={!DEMO_ACCOUNTS.includes(email)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
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
                  {isSigningUp ? "Sign Up" : "Sign In"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
  );
};

export default AuthForm;
