
import { useState } from "react";
import { UserFilters } from "./components/user-management/UserFilters";
import { UsersTable } from "./components/user-management/UsersTable";
import { UserRole } from "./types/user";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

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
          <UsersTable searchQuery={searchQuery} roleFilter={roleFilter} />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
