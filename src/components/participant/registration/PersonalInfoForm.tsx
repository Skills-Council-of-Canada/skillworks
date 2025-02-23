
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { Icons } from "@/components/ui/icons";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const personalInfoSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: passwordSchema,
  date_of_birth: z.string().refine((date) => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return new Date(date) <= eighteenYearsAgo;
  }, "You must be at least 18 years old"),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoFormValues) => void;
  onValidityChange: (isValid: boolean) => void;
}

export const PersonalInfoForm = ({ onSubmit, onValidityChange }: PersonalInfoFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [socialError, setSocialError] = React.useState<string>("");
  
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      date_of_birth: "",
    },
  });

  // Watch all fields for changes
  React.useEffect(() => {
    const subscription = form.watch(() => {
      // Check if all fields are filled and valid
      const values = form.getValues();
      const isComplete = Object.values(values).every(value => value !== "");
      const isValid = Object.keys(form.formState.errors).length === 0 && isComplete;
      
      console.log("Form state:", {
        values,
        errors: form.formState.errors,
        isValid,
        isComplete
      });
      
      onValidityChange(isValid);
    });
    
    return () => subscription.unsubscribe();
  }, [form, onValidityChange]);

  const handleSocialLogin = async (provider: 'google' | 'linkedin_oidc') => {
    try {
      setIsLoading(true);
      setSocialError("");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      setSocialError("Failed to connect with social provider");
      console.error("Social login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                You'll need to verify this email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Choose a password" {...field} />
              </FormControl>
              <FormDescription>
                Password must contain at least 8 characters, one uppercase letter,
                one lowercase letter, one number, and one special character
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSocialLogin('google')}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleSocialLogin('linkedin_oidc')}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.linkedin className="mr-2 h-4 w-4" />
            )}
            LinkedIn
          </Button>
        </div>

        {socialError && (
          <p className="text-sm text-destructive text-center">{socialError}</p>
        )}

        <button type="submit" style={{ display: 'none' }} />
      </form>
    </Form>
  );
};
