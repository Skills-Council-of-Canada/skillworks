
import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import CareerPathways from "@/pages/CareerPathways";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/career-pathways",
    element: <CareerPathways />,
  }
]);
