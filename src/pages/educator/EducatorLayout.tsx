
import { Outlet, useLocation } from "react-router-dom";
import { EducatorNavigation } from "@/components/educator/layout/EducatorNavigation";
import { EducatorHeader } from "@/components/educator/layout/EducatorHeader";
import { EducatorFooter } from "@/components/educator/layout/EducatorFooter";
import { useAuth } from "@/contexts/AuthContext";

const EducatorLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  // Generate page title based on current route
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "educator") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 flex-shrink-0">
        <EducatorNavigation onLogout={logout} userName={user?.name || ""} />
      </div>
      <div className="flex-1 flex flex-col">
        <EducatorHeader pageTitle={getPageTitle()} />
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
        <EducatorFooter />
      </div>
    </div>
  );
};

export default EducatorLayout;
