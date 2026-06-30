import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("login", "routes/login.tsx"),
    route("oath/callback", "routes/callback.tsx")
] satisfies RouteConfig;
