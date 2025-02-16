
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const MessageSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const updateSetting = async (key: string, value: boolean) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_message_settings')
      .upsert({
        user_id: user.id,
        [key]: value,
      }, {
        onConflict: 'user_id'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!user) return;

    // Initialize user settings if they don't exist
    supabase
      .from('user_message_settings')
      .upsert({
        user_id: user.id,
      }, {
        onConflict: 'user_id'
      })
      .then(({ error }) => {
        if (error) {
          console.error('Failed to initialize settings:', error);
        }
      });
  }, [user]);

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="darkMode">Dark Mode</Label>
        <Switch
          id="darkMode"
          onCheckedChange={(checked) => updateSetting('dark_mode', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="emailNotifications">Email Notifications</Label>
        <Switch
          id="emailNotifications"
          onCheckedChange={(checked) => updateSetting('email_notifications', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="desktopNotifications">Desktop Notifications</Label>
        <Switch
          id="desktopNotifications"
          onCheckedChange={(checked) => updateSetting('desktop_notifications', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="soundNotifications">Sound Notifications</Label>
        <Switch
          id="soundNotifications"
          onCheckedChange={(checked) => updateSetting('sound_notifications', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="messagePreview">Message Preview</Label>
        <Switch
          id="messagePreview"
          onCheckedChange={(checked) => updateSetting('message_preview', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="typingPreview">Typing Indicators</Label>
        <Switch
          id="typingPreview"
          onCheckedChange={(checked) => updateSetting('typing_preview', checked)}
        />
      </div>
    </div>
  );
};
