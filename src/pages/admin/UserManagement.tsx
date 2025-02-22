
import { useState } from "react";
import { UserFilters } from "./components/user-management/UserFilters";
import { UsersTable } from "./components/user-management/UsersTable";
import { UserRole } from "./types/user";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', { searchQuery, roleFilter }],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <div className="w-full md:w-auto">
          <UserFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full inline-block align-middle">
          <UsersTable 
            users={users}
            isLoading={isLoading}
            onStatusChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
