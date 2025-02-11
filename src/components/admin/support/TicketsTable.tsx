
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SupportTicket } from "@/types/support";

interface TicketsTableProps {
  tickets: SupportTicket[];
  onViewDetails: (ticket: SupportTicket) => void;
}

export function TicketsTable({ tickets, onViewDetails }: TicketsTableProps) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-500",
      medium: "bg-blue-500",
      high: "bg-yellow-500",
      urgent: "bg-red-500",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: "bg-green-500",
      in_progress: "bg-blue-500",
      resolved: "bg-gray-500",
      closed: "bg-gray-700",
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets?.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.title}</TableCell>
            <TableCell className="capitalize">{ticket.category}</TableCell>
            <TableCell>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(ticket.status)}>
                {ticket.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(ticket.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(ticket)}
                className="hover:bg-primary hover:text-primary-foreground"
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
