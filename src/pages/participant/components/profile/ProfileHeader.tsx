
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Camera } from "lucide-react";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileHeaderProps {
  profile: CombinedProfile | null;
  completionPercentage: number;
  userName?: string | null;
}

export const ProfileHeader = ({ profile, completionPercentage, userName }: ProfileHeaderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
  });

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      // Create avatars bucket if it doesn't exist
      const { data: bucketExists } = await supabase.storage.getBucket('avatars');
      if (!bucketExists) {
        await supabase.storage.createBucket('avatars', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2 // 2MB
        });
      }

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Invalidate queries to refetch profile data
      await queryClient.invalidateQueries({ queryKey: ['participant-profile'] });

      toast({
        title: "Avatar updated",
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

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editValues.full_name,
          bio: editValues.bio,
        })
        .eq('id', user.id);

      if (error) throw error;

      // Invalidate queries to refetch profile data
      await queryClient.invalidateQueries({ queryKey: ['participant-profile'] });

      toast({
        title: "Updated successfully",
        description: "Your profile has been updated.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-900 to-white" />
        <div className="relative px-4 sm:px-6 pb-6">
          <div className="flex justify-between items-start">
            <div className="relative group">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 -mt-12 ring-4 ring-white">
                {profile?.avatar_url ? (
                  <AvatarImage 
                    src={profile.avatar_url} 
                    alt={profile.full_name || userName || "Profile"} 
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl sm:text-5xl">
                    {(profile?.full_name?.[0] || userName?.[0] || "U").toUpperCase()}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="mt-2"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="ml-0 sm:ml-36 pt-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <Input
                    value={editValues.full_name}
                    onChange={(e) => setEditValues(prev => ({ ...prev, full_name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <Textarea
                    value={editValues.bio}
                    onChange={(e) => setEditValues(prev => ({ ...prev, bio: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {profile?.full_name || userName}
                </h1>
                <p className="mt-1 text-gray-500">
                  {profile?.bio || "No bio provided"}
                </p>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Profile Completion</p>
                <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
