import type { AttributeOption } from "~/schemas";
import { AttributeType, type AttributeCategory, type SelectedAttribute } from "~/types/Attribute";

const BASE_URL = import.meta.env.VITE_API_URL;
export async function getAttribute(search : string) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/attributes?search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if(!res.ok){
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch attributes");
        }

        const data = await res.json();

        return data.attributes;
    } catch(err:any) {
        throw new Error(err.message || "Failed to fetch attributes");
    }
}

export default async function getAttributes(page: number, search: string, filter: string) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/attributes?page=${page}&search=${search}&filter=${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if(!res.ok){
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to fetch attributes");
        }

        const attributes = await res.json();

        return attributes;
    } catch(err:any) {
        throw new Error(err.message || "Failed to fetch attributes");
    }
}

export function isAuthorized(statusCode: number) {
    if(statusCode === 401) {
        window.location.href = "/login";
    } else if (statusCode === 403) {
        window.location.href = "/";
    } else if(statusCode === 404) {
        window.location.href = "/not-found";
    }
}

export async function deleteAttribute(attributes: SelectedAttribute[]) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/attributes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ attributes }),
        })

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.error || "Failed to delete attributes");
        }

        return await res.json();
    } catch(err:any) {
        throw new Error(err.message || "Failed to delete attributes");
    }
}

export function getToken() {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token) window.location.href = "/login";
    return token;
}

export async function createAttribute({name, description, category, type, attributeOptions}:{name: string, description: string, category: AttributeCategory, type: AttributeType, attributeOptions?: AttributeOption[]}) {
    try {
        const token = getToken();
        const body = {
            name,
            description,
            category, 
            type, 
            ...(type === AttributeType.SELECT && {attributeOptions})
        }
        const res = await fetch(`${BASE_URL}/attributes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, conflict: res.status === 409, message: error.error || "Failed to create attribute"};
        }
        return {success: true, message: "Attribute created successfully"};
    } catch(err:any) {
        throw new Error(err.message || "Failed to create attribute");
    }
} 

export async function updateAttribute(form: {type: AttributeType, name: string, description: string, category: AttributeCategory, updatedAt: Date, id: number, attributeOptions?: AttributeOption[]}) {
    try {
        const token = getToken();
        const {id, name, category, description, updatedAt, attributeOptions, type} = form;
        const res = await fetch(`${BASE_URL}/attributes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, category, updatedAt, attributeOptions, type }),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, conflict: res.status === 409, message: error.error || "Failed to update attribute"};
        }
        return {success: true, message: "Attribute updated successfully"};
    } catch(err:any) {
        throw new Error(err.message || "Failed to update attribute");
    }
}