
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Loader2, Building2, GraduationCap, UserCircle } from "lucide-react";
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
      return "/dashboard";
    default:
      return "/dashboard";
  }
};

const portals = [
  {
    id: "employer",
    title: "Employer Portal",
    description: "Post projects and find skilled workers",
    role: "employer" as UserRole,
    icon: Building2,
    gradient: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
    borderGradient: "hover:border-blue-500/50",
  },
  {
    id: "educator",
    title: "Educator Portal",
    description: "Manage training programs and track student progress",
    role: "educator" as UserRole,
    icon: GraduationCap,
    gradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    borderGradient: "hover:border-green-500/50",
  },
  {
    id: "participant",
    title: "Participant Portal",
    description: "Find opportunities and track your learning journey",
    role: "participant" as UserRole,
    icon: UserCircle,
    gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    borderGradient: "hover:border-orange-500/50",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { login, signup, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    if (user) {
      const redirectPath = roleBasedRedirect(user.role);
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPortal) return;

    try {
      const portalEmail = `${email.split('@')[0]}_${selectedPortal}@${email.split('@')[1]}`;
      
      if (isSigningUp) {
        await signup(portalEmail, password);
      } else {
        await login(portalEmail, password);
      }
    } catch (error) {
      console.error("Auth failed:", error);
    }
  };

  if (!selectedPortal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 px-4">
        <div className="w-full max-w-4xl space-y-8 animate-fadeIn">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-secondary mb-2">Welcome to Our Platform</h2>
            <p className="text-secondary/60 mb-8 text-lg">Choose your portal to continue</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card 
                  key={portal.id}
                  className={`p-6 cursor-pointer transition-all duration-300 border-2 ${portal.gradient} ${portal.borderGradient} hover:shadow-lg`}
                  onClick={() => setSelectedPortal(portal.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Icon className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{portal.title}</h3>
                      <p className="text-secondary/60 mb-4">{portal.description}</p>
                    </div>
                    <Button className="w-full group">
                      Select Portal
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const currentPortal = portals.find(p => p.id === selectedPortal)!;
  const Icon = currentPortal.icon;

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentPortal.gradient} px-4`}>
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setSelectedPortal(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portal Selection
          </Button>
          <div className="flex flex-col items-center gap-4">
            <Icon className="h-16 w-16 text-primary" />
            <h2 className="text-4xl font-bold text-secondary">
              {currentPortal.title}
            </h2>
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
    </div>
  );
};

export default Login;
