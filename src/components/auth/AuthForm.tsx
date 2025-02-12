
import { useState, useEffect } from "react";
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
  onSubmit: (username: string, password: string, isSignUp: boolean) => Promise<void>;
  defaultUsername?: string;
  showEmailField?: boolean;
  autoLogin?: boolean;
}

const AuthForm = ({
  icon: Icon,
  title,
  gradient,
  isLoading,
  onBack,
  onSubmit,
  defaultUsername = "",
  showEmailField = true,
  autoLogin = false,
}: AuthFormProps) => {
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("password123");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (autoLogin && !isLoading) {
      handleSubmit(new Event('submit') as React.FormEvent);
    }
  }, [autoLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault?.();
    if (isLoading) return;
    
    setError(null);

    try {
      await onSubmit(username, password, isSigningUp);
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
          <p className="text-secondary/60">Logging you in automatically...</p>
        </div>
      </div>

      <Card className="p-6 bg-card/50 backdrop-blur-sm shadow-xl border-0">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
