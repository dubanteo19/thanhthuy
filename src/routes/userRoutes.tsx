import { HeartPage } from "@/page/HeartPage";
import { QCGeneratorPage } from "@/page/QCGeneratorPage";
import { type RouteObject } from "react-router-dom";

export const userRoutes: RouteObject = {
  path: "/",
  children: [
    { path: "love", element: <HeartPage /> },
    { index: true, path: "qc", element: <QCGeneratorPage /> },
  ],
};
