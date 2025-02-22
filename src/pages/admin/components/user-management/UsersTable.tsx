
import { UserCheck, UserX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Profile, UserStatus } from "../../types/user";

interface UsersTableProps {
  users: Profile[] | undefined;
  isLoading: boolean;
  onStatusChange: (userId: string, newStatus: UserStatus) => void;
  isMobile?: boolean;
}

export function UsersTable({ users, isLoading, onStatusChange, isMobile }: UsersTableProps) {
  const getBadgeVariant = (status: UserStatus) => {
    switch (status) {
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      case "pending":
        return "secondary";
      case "suspended":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (isMobile) {
    return (
      <div className="divide-y">
        {isLoading ? (
          <div className="p-4 text-center">Loading users...</div>
        ) : users?.length === 0 ? (
          <div className="p-4 text-center">No users found</div>
        ) : (
          users?.map((user) => (
            <div key={user.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onStatusChange(
                      user.id,
                      user.status === "approved" ? "suspended" : "approved"
                    )
                  }
                >
                  {user.status === "approved" ? (
                    <UserX className="h-4 w-4" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Badge variant="outline">{user.role}</Badge>
                <Badge variant={getBadgeVariant(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Loading users...
            </TableCell>
          </TableRow>
        ) : users?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No users found
            </TableCell>
          </TableRow>
        ) : (
          users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline">{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(user.status)}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onStatusChange(
                        user.id,
                        user.status === "approved" ? "suspended" : "approved"
                      )
                    }
                  >
                    {user.status === "approved" ? (
                      <UserX className="h-4 w-4" />
                    ) : (
                      <UserCheck className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
