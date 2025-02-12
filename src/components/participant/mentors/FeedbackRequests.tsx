
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, Loader2 } from "lucide-react";
import { useFeedbackRequests } from "@/hooks/participant/useFeedbackRequests";

export const FeedbackRequests = () => {
  const { requests, createRequest, isLoading } = useFeedbackRequests();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    await createRequest({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Request Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <CheckSquare className="h-4 w-4 mr-2" />
              )}
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {requests?.map((request) => (
          <Card key={request.id}>
            <CardContent className="pt-6">
              <h3 className="font-semibold">{request.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {request.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm">
                  Status: {request.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
