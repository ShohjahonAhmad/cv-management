import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [ 
    route("login", "routes/login.tsx"),
    route("auth/callback", "routes/callback.tsx"),
    layout("layouts/dashboard-layout.tsx", [
        index("routes/home.tsx"),
        route("users", "routes/users.tsx"),
        route("attributes", "routes/attributes.tsx"),
        route("positions", "routes/positions.tsx"),
        route("profile", "routes/profile.tsx"),
        route("positions/:id", "routes/position-details.tsx")
    ])
] satisfies RouteConfig;
