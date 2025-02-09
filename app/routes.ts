import {
  index,
  layout,
  route,
  prefix,
  type RouteConfig,
} from "@react-router/dev/routes";
export const routes: RouteConfig = [
  // Protected routes (require authentication)
  layout("layouts/plain.tsx", [
    route("/", "routes/user/dashboard/index.tsx"),
    // Add other protected routes here
  ]),
];

export default routes satisfies RouteConfig;
