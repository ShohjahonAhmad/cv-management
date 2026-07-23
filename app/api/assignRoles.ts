import type { Role } from "~/types/Role";
import type { SelectedUser } from "~/types/User";
import { getToken, isAuthorized } from "./getAttributes";
const BASE_URL = import.meta.env.VITE_API_URL;

export type AssignRolesResponse = {
    conflicts: number;
    changeCount: number;
    count: number;
    action: "assign";
    role: Role;
}

export default async function assignRoles(users: SelectedUser[], role : Role): Promise<AssignRolesResponse> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/users/role`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ users, role }),
        })
        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.message || "Failed to assign roles");
        }

        const data = await res.json() as Omit<AssignRolesResponse, "action" | "role">;

        return {...data, action: "assign", role};
    } catch(err) {
        if(err instanceof Error)
        throw new Error(err.message || "Failed to assign roles");

        throw new Error("Failed to assign roles");
    }
}