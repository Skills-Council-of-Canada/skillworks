
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const UpdatesTab = () => {
  const { experienceId } = useParams();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    content: "",
    visibility: "all",
  });

  const { data: updates, isLoading, refetch } = useQuery({
    queryKey: ["experience-updates", experienceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_updates")
        .select(`
          *,
          author:author_id (
            name
          )
        `)
        .eq("experience_id", experienceId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching updates:", error);
        toast({
          title: "Error",
          description: "Failed to load updates",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!experienceId,
  });

  const handleCreateUpdate = async () => {
    try {
      const { error } = await supabase
        .from("experience_updates")
        .insert({
          experience_id: experienceId,
          author_id: (await supabase.auth.getUser()).data.user?.id,
          title: newUpdate.title,
          content: newUpdate.content,
          visibility: newUpdate.visibility,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Update created successfully",
      });

      setIsCreateDialogOpen(false);
      setNewUpdate({ title: "", content: "", visibility: "all" });
      refetch();
    } catch (error) {
      console.error("Error creating update:", error);
      toast({
        title: "Error",
        description: "Failed to create update",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUpdate = async (updateId: string) => {
    try {
      const { error } = await supabase
        .from("experience_updates")
        .delete()
        .eq("id", updateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Update deleted successfully",
      });

      refetch();
    } catch (error) {
      console.error("Error deleting update:", error);
      toast({
        title: "Error",
        description: "Failed to delete update",
        variant: "destructive",
      });
    }
  };

  const getVisibilityBadgeVariant = (visibility: string) => {
    switch (visibility) {
      case "all":
        return "default";
      case "learners":
        return "secondary";
      case "employers":
        return "outline";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return <div>Loading updates...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Updates</CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Update
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Update</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newUpdate.title}
                  onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newUpdate.content}
                  onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={newUpdate.visibility}
                  onValueChange={(value) => setNewUpdate({ ...newUpdate, visibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="learners">Learners Only</SelectItem>
                    <SelectItem value="employers">Employers Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateUpdate}>Create Update</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {updates && updates.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell className="font-medium">{update.title}</TableCell>
                  <TableCell className="max-w-md truncate">{update.content}</TableCell>
                  <TableCell>{update.author?.name}</TableCell>
                  <TableCell>
                    <Badge variant={getVisibilityBadgeVariant(update.visibility)}>
                      {update.visibility}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(update.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteUpdate(update.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No updates found for this experience.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
