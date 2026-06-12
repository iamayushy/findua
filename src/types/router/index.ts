import type { FC, LazyExoticComponent } from "react";



interface IApplicationRoutes {
  path?: string | string[];
  index?: boolean;
  component?: FC | LazyExoticComponent<FC>;
  guard?: FC;
  children?: IApplicationRoutes[];
  redirect?: string;
}

export type { IApplicationRoutes };