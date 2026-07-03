import type { Role } from "~/types/Role";
import type { SelectedUser } from "~/types/User";
const BASE_URL = import.meta.env.VITE_API_URL;

export default async function assignRoles(users: SelectedUser[], role : Role): Promise<string> {
    const token = localStorage.getItem("token");
    if(!token) window.location.href = "/login";
    try {
        const res = await fetch(`${BASE_URL}/users/role`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ users, role }),
        })
        if(!res.ok) {
            if(res.status === 401) {
                window.location.href = "/login";
            }
            const error = await res.json();
            throw new Error(error.message || "Failed to assign roles");
        }

        const data = await res.json();

        return data.message;
    } catch(err) {
        if(err instanceof Error)
        throw new Error(err.message || "Failed to assign roles");

        throw new Error("Failed to assign roles");
    }
}