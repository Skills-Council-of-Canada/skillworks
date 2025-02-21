
import AuthForm from "@/components/auth/AuthForm";
import Header from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <AuthForm 
            onBack={() => {}} 
            gradient="bg-gradient-to-br from-primary/5 to-secondary/5"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
