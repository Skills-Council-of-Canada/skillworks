
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserFilters } from "./components/user-management/UserFilters";
import { UsersTable } from "./components/user-management/UsersTable";
import { Profile, UserRole, UserStatus } from "./types/user";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users", roleFilter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (roleFilter !== "all") {
        query = query.eq("role", roleFilter);
      }

      if (searchQuery) {
        query = query.ilike("email", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching users:", error);
        throw error;
      }

      return data as Profile[];
    },
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 300000, // Keep cache for 5 minutes
    meta: {
      onSettled: (_, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load users",
            variant: "destructive",
          });
        }
      }
    }
  });

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: newStatus })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User status updated successfully",
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
      </div>

      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />

      <UsersTable
        users={users}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default UserManagement;
