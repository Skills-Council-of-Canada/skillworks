
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Smartphone } from "lucide-react";

const formSchema = z.object({
  twoFactorEnabled: z.boolean(),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number").optional(),
});

type SecuritySettingsFormData = z.infer<typeof formSchema>;

interface SecuritySettingsFormProps {
  onUpdate: () => void;
}

const SecuritySettingsForm = ({ onUpdate }: SecuritySettingsFormProps) => {
  const form = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactorEnabled: false,
      phoneNumber: "",
    },
  });

  const onSubmit = (data: SecuritySettingsFormData) => {
    console.log("Security Settings Form Data:", data);
    onUpdate();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication
              </p>
              
              <FormField
                control={form.control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable 2FA</FormLabel>
                      <FormDescription>
                        Require a verification code when signing in
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("twoFactorEnabled") && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-4">
                    <Smartphone className="h-5 w-5 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium mb-2">Verification Phone Number</h4>
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input 
                                placeholder="Enter phone number for 2FA" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Button type="submit">Save Security Settings</Button>
      </form>
    </Form>
  );
};

export default SecuritySettingsForm;
