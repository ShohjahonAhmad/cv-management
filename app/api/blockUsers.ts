import type { SelectedUser } from "~/types/User";

const BASE_URL = import.meta.env.VITE_API_URL;

export default async function blockUsers(users: SelectedUser[], isBlocked : boolean) {
    const token = localStorage.getItem("token");
    if(!token) window.location.href = "/login";
    try {
        const res = await fetch(`${BASE_URL}/users/block`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ users, isBlocked }),
        })
        if(!res.ok) {
            if(res.status === 401) {
                window.location.href = "/login";
                return;
            }
            const error = await res.json();
            throw new Error(error.message || "Failed to block users");
        }

        const data = await res.json();

        return data.message;
    } catch(err) {
        if(err instanceof Error)
        throw new Error(err.message || "Failed to block users");

        throw new Error("Failed to block users");
    }
}