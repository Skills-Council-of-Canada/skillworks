
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileInfoProps {
  fullName?: string | null;
  bio?: string | null;
  userName?: string | null;
}

export const ProfileInfo = ({ fullName, bio, userName }: ProfileInfoProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: fullName || "",  // Changed back to 'name' to match the database column
    bio: bio || "",
  });

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editValues.name,  // Use 'name' instead of 'full_name'
          bio: editValues.bio,
        })
        .eq('id', user.id);

      if (error) throw error;

      // Invalidate the query to refetch latest data
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
    <div className="ml-0 sm:ml-36 pt-4">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="mt-2"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              value={editValues.name}
              onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
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
            {fullName || userName}
          </h1>
          <p className="mt-1 text-gray-500">
            {bio || "No bio provided"}
          </p>
        </div>
      )}
    </div>
  );
};
