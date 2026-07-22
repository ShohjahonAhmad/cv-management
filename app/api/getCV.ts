import type { AttributeValue } from "~/types/Profile";
import { getToken, isAuthorized } from "./getAttributes";
import type { CV } from "~/types/CV";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apply(positionId : number | string) {
    try {   
        const token = getToken();
        const res = await fetch(`${BASE_URL}/cv/${positionId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            return {success: false, notFound: res.status === 404};
        }
        const {cv} = await res.json() as {cv: CV};

        return {success: true, cv};
    } catch(err: any) {
        return {success: false, notFound: false};
    }
}

export type GetCVResponse = {
    cv: CV;
    attributeValues: AttributeValue[];
    readOnly: boolean;
}
export async function getCV(id: number | string) : Promise<GetCVResponse> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/cv/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch CV");
        }

        return await res.json() as GetCVResponse;
    } catch(err: any) {
        throw new Error(err.message || "Failed to fetch CV");
    }
}

export async function updateCV(id: number | string, attributeValues: AttributeValue[]) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/cv/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ attributeValues })
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            console.log("res status" + res.status);
            return {success: false, notFound: res.status === 404, error: error.error || "Failed to update CV"};
        }

        return {success: true, published: false};
    } catch(err: any) {
        return {success: false, error: err.message || "Failed to update CV"};
    }
}

export async function publishCV(id: number | string) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/cv/${id}/publish`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, notFound: res.status === 404, error: error.error || "Failed to publish CV"};
        }

        return {success: true, published: true};
    } catch(err: any) {
        return {success: false, error: err.message || "Failed to publish CV"};
    }
}


type GetCVsResponse = {
    cvs: CV[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}
export async function getCVs(page: number, search: string) : Promise<GetCVsResponse> {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/cv?page=${page}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch CVs");
        }

        return await res.json() as GetCVsResponse;
    } catch(err: any) {
        throw new Error(err.message || "Failed to fetch CVs");
    }
}