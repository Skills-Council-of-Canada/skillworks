
import { useState } from "react";
import { UserFilters } from "./components/user-management/UserFilters";
import { UsersTable } from "./components/user-management/UsersTable";
import { UserRole } from "./types/user";
import { useQuery } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const isMobile = useIsMobile();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', { searchQuery, roleFilter }],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <UserFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <UsersTable 
          users={users}
          isLoading={isLoading}
          onStatusChange={() => {}}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default UserManagement;
