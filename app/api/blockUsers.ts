import type { SelectedUser } from "~/types/User";
import { getToken, isAuthorized } from "./getAttributes";

const BASE_URL = import.meta.env.VITE_API_URL;

export type BlockUsersResponse = {
    conflicts: number;
    changeCount: number;
    count: number;
    action: "block";
    isBlocked: boolean;
}

export default async function blockUsers(users: SelectedUser[], isBlocked : boolean): Promise<BlockUsersResponse> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/users/block`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ users, isBlocked }),
        })
        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.message || "Failed to block users");
        }

        const data = await res.json() as Omit<BlockUsersResponse, "action" | "isBlocked">;

        return {...data, action: "block", isBlocked};
    } catch(err) {
        if(err instanceof Error)
        throw new Error(err.message || "Failed to block users");

        throw new Error("Failed to block users");
    }
}