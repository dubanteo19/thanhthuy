import { UserLayout } from "@/layout/UserLayout";
import { HeartPage } from "@/page/HeartPage";
import { HomePage } from "@/page/HomePage";
import { Navigate, type RouteObject } from "react-router-dom";

export const userRoutes: RouteObject = {
  path: "/",
  element: <UserLayout />,
  children: [
    { index: true, element: <Navigate to={"home"} /> },
    { path: "home", index: true, element: <HomePage /> },
    { path: "heart",  element: <HeartPage /> },
  ],
};
