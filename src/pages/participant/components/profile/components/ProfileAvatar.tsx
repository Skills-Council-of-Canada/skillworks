
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
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState(avatarUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      setIsUploading(true);

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

      // Update local state immediately
      setCurrentAvatarUrl(publicUrl);
      
      // Update the query data directly instead of invalidating
      queryClient.setQueryData(["participant-profile", user.id], (oldData: any) => ({
        ...oldData,
        avatar_url: publicUrl
      }));

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
    } finally {
      setIsUploading(false);
    }
  };

  // Use the local state for rendering, falling back to prop
  const displayAvatarUrl = currentAvatarUrl || avatarUrl;

  return (
    <div className="relative group">
      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 -mt-12 ring-4 ring-white">
        {displayAvatarUrl ? (
          <AvatarImage 
            src={displayAvatarUrl}
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
        className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity ${isUploading ? 'cursor-wait' : ''}`}
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
        disabled={isUploading}
      />
    </div>
  );
};
