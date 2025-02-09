
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AuthFormProps {
  icon: LucideIcon;
  title: string;
  gradient: string;
  isLoading: boolean;
  onBack: () => void;
  onSubmit: (email: string, password: string, isSignUp: boolean) => Promise<void>;
}

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isSigningUp);
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
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background/50"
                required
              />
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
