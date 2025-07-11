import { HeartPage } from "@/page/HeartPage";
import { type RouteObject } from "react-router-dom";

export const userRoutes: RouteObject = {
  path: "/",
  children: [{ index: true, element: <HeartPage /> }],
};
