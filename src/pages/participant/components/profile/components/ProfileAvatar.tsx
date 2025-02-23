
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ProfileAvatarProps {
  avatarUrl?: string | null;
  name?: string | null;
  userName?: string | null;
}

export const ProfileAvatar = ({ avatarUrl, name, userName }: ProfileAvatarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      // First, create the storage bucket if it doesn't exist
      const { data: bucketExists } = await supabase
        .storage
        .getBucket('avatars');

      if (!bucketExists) {
        await supabase
          .storage
          .createBucket('avatars', {
            public: true,
            fileSizeLimit: 1024 * 1024 * 2 // 2MB limit
          });
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: 'no-cache',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ['participant-profile'] });
      setCacheBuster(Date.now()); // Update cache buster to force re-render

      toast({
        title: "Success",
        description: "Your profile picture has been updated successfully.",
      });

    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cachedAvatarUrl = avatarUrl ? `${avatarUrl}?t=${cacheBuster}` : null;

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 -mt-12 ring-4 ring-white">
        {cachedAvatarUrl ? (
          <AvatarImage 
            src={cachedAvatarUrl} 
            alt={name || userName || "Profile"} 
            className="object-cover"
          />
        ) : (
          <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl sm:text-5xl">
            {(name?.[0] || userName?.[0] || "U").toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <label 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
        htmlFor="avatar-upload"
      >
        <Camera className="h-8 w-8 text-white" />
      </label>
      <input
        type="file"
        id="avatar-upload"
        className="hidden"
        accept="image/*"
        onChange={handleAvatarUpload}
      />
    </div>
  );
};
