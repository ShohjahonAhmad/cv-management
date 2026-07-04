import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("login", "routes/login.tsx"),
    route("auth/callback", "routes/callback.tsx"),
    layout("layouts/dashboard-layout.tsx", [
        route("users", "routes/users.tsx"),
        route("attributes", "routes/attributes.tsx"),
    ])
] satisfies RouteConfig;
