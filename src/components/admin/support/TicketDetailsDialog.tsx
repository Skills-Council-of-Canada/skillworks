
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send } from "lucide-react";
import type { SupportTicket, TicketMessage } from "@/types/support";

interface TicketDetailsDialogProps {
  ticket: SupportTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDetailsDialog({
  ticket,
  open,
  onOpenChange,
}: TicketDetailsDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ["ticket-messages", ticket?.id],
    queryFn: async () => {
      if (!ticket) return [];
      const { data, error } = await supabase
        .from("ticket_messages")
        .select("*")
        .eq("ticket_id", ticket.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as TicketMessage[];
    },
    enabled: !!ticket,
  });

  const updateTicketStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("support_tickets")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      toast({
        title: "Success",
        description: "Ticket status updated successfully",
      });
    },
  });

  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!ticket) return;
      const { error } = await supabase.from("ticket_messages").insert({
        ticket_id: ticket.id,
        message: newMessage,
        is_internal: isInternal,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ["ticket-messages", ticket?.id] });
      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    },
  });

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{ticket.title}</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{ticket.category}</Badge>
              <Badge className="capitalize" variant="outline">
                {ticket.priority}
              </Badge>
              <Select
                value={ticket.status}
                onValueChange={(value) =>
                  updateTicketStatus.mutate({ id: ticket.id, status: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 my-4 border rounded-md">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm">{ticket.description}</p>
          </div>

          {isLoadingMessages ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.is_internal
                      ? "bg-yellow-100 dark:bg-yellow-900"
                      : "bg-blue-100 dark:bg-blue-900"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(message.created_at).toLocaleString()}
                    {message.is_internal && " (Internal Note)"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col gap-4">
          <div className="flex items-center gap-2 w-full">
            <Button
              variant={isInternal ? "default" : "outline"}
              size="sm"
              onClick={() => setIsInternal(!isInternal)}
            >
              {isInternal ? "Internal Note" : "Public Reply"}
            </Button>
          </div>
          <div className="flex w-full gap-2">
            <Textarea
              placeholder={
                isInternal ? "Add internal note..." : "Type your reply..."
              }
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage.mutate()}
              disabled={!newMessage.trim() || sendMessage.isPending}
            >
              {sendMessage.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
