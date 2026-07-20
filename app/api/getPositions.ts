import type { CreatePosition, Position, ProjectTag, SelectedPosition, UpdatePosition } from "~/types/Position";
import { getToken, isAuthorized } from "./getAttributes";

const BASE_URL = import.meta.env.VITE_API_URL;
export async function getPositions(page: number, search: string) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/positions?page=${page}&take=10&search=${search}`, {
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

export async function deletePositions(positions: SelectedPosition[]) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/positions`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ positions }),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to delete positions");
        }

        return await res.json();
    } catch(err:any) {
        throw new Error(err.message || "Failed to delete positions");
    }
}

export async function getTags(search: string): Promise<ProjectTag[]> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/tags?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch tags");
        }
        const data = await res.json();
        return data.tags;
    } catch(err: any){
        throw new Error(err.message || "Failed to fetch tags");
    }
}

export async function createPosition({title, description, company, level, maxProjects, attributeIds, tags}: CreatePosition) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/positions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({title, description, company, level, maxProjects, attributeIds, tags}),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, message: error.error || "Failed to create position"};
        }

        return {success: true, message: "Position created successfully"};;
    } catch(err:any) {
        throw new Error(err.message || "Failed to create position");
    }
}

export async function updatePosition( {id, title, description, company, level, maxProjects, attributeIds, tags, updatedAt} :  UpdatePosition) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/positions/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({title, description, company, level, maxProjects, attributeIds, tags, updatedAt}),
        })

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            console.log(error);
            return {success: false, conflict: res.status === 409, message: error.error || "Failed to update position"};
        }

        return {success: true, update: true, message: "Position updated successfully"};
    } catch(err:any){
        throw new Error(err.message || "Failed to update position");
    }
}

export async function getPositionById(id: string): Promise<Position> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/candidate/positions/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch position");
        }

        return await res.json();
    } catch(err: any) {
        throw new Error(err.message || "Failed to fetch position");
    }
}