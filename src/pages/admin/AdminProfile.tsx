
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="mt-1 capitalize">{user?.role}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Activity</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Last Login</label>
              <p className="mt-1">Today at 9:00 AM</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Account Created</label>
              <p className="mt-1">January 1, 2024</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
