import { getToken, isAuthorized } from "./getAttributes";

const BASE_URL = import.meta.env.VITE_API_URL;
export async function getPositions() {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/positions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch positions");
        }

        const positions = await res.json();

        return positions;
    } catch(err: any) {
        throw new Error(err.message || "Failed to fetch positions");
    }
}