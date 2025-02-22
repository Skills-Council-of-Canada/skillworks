
import { Outlet } from "react-router-dom";
import { EducatorNavigation } from "@/components/educator/layout/EducatorNavigation";
import { EducatorHeader } from "@/components/educator/layout/EducatorHeader";
import { EducatorFooter } from "@/components/educator/layout/EducatorFooter";
import { useAuth } from "@/contexts/AuthContext";

const EducatorLayout = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex">
      <div className="w-64 flex-shrink-0">
        <EducatorNavigation onLogout={logout} userName={user?.name || ""} />
      </div>
      <div className="flex-1 flex flex-col">
        <EducatorHeader />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
        <EducatorFooter />
      </div>
    </div>
  );
};

export default EducatorLayout;
