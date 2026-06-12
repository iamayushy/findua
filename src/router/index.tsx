import type { IApplicationRoutes } from "@/types/router";
import { Fragment, Suspense } from "react";
import { 
  createBrowserRouter, 
  Navigate, 
  Outlet, 
  RouterProvider, 
  useNavigation,
  type RouteObject
} from "react-router";
import applicationRoutes from "./routerEntry";

import Navbar from "@/components/shared/navbar";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

const PageLoader = () => (
  <div className="page-route-loader">
    <div className="spinner" />
  </div>
);

const RouteTransitionHandler = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  if (!isNavigating) return null;

  return (
    <div className="transition-loader-overlay">
      <div className="spinner" />
    </div>
  );
};

const mapApplicationRoutesToObjects = (routes: IApplicationRoutes[]): RouteObject[] => {
  if (!routes || routes.length === 0) return [];

  const list: RouteObject[] = [];

  routes.forEach((route) => {
    const { path, index, component: Component, guard, children, redirect } = route;
    const Guard = guard || Fragment;

    const element = Component ? (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Guard>
            <Component />
          </Guard>
        </Suspense>
      </ErrorBoundary>
    ) : null;

    if (index) {
      list.push({
        index: true,
        element: element
      });
      return;
    }

    const isPathArray = Array.isArray(path);
    const mappedChildren = children ? mapApplicationRoutesToObjects(children) : [];

    if (redirect) {
      mappedChildren.unshift({
        index: true,
        element: <Navigate to={redirect} replace />
      });
    }

    if (isPathArray && path.length > 0) {
      path.forEach((p: string) => {
        list.push({
          path: p,
          element: element,
          children: mappedChildren.length > 0 ? mappedChildren : undefined
        });
      });
      return;
    }

    list.push({
      path: path as string,
      element: element,
      children: mappedChildren.length > 0 ? mappedChildren : undefined
    });
  });

  return list;
};

export default function ApplicationRoutes() {
  const routesConfig = mapApplicationRoutesToObjects(applicationRoutes);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <RouteTransitionHandler />
          <div className="app-content-container">
            <Outlet />
          </div>
        </>
      ),
      children: routesConfig
    }
  ]);

  return <RouterProvider router={router} />;
}