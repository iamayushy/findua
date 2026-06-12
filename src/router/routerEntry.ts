import type { IApplicationRoutes } from "@/types/router";
import { lazy } from "react";
const routes: IApplicationRoutes[] = [
  {
    path: ["","products"],
    component: lazy(() => import("@/pages/productListing"))
  },
  {
    path: "products/:id",
    component: lazy(() => import("@/pages/productDisplay"))
  }
];

export default routes;