import type { AttributeCategory, AttributeType, SelectedAttribute } from "~/types/Attribute";

const BASE_URL = import.meta.env.VITE_API_URL;
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
    if(statusCode === 401 || statusCode === 403) {
        window.location.href = "/login";
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

export async function createAttribute({name, description, category, type}:{name: string, description: string, category: AttributeCategory, type: AttributeType}) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/attributes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, category, type }),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, message: error.error || "Failed to create attribute"};
        }
        return {success: true, message: "Attribute created successfully"};
    } catch(err:any) {
        throw new Error(err.message || "Failed to create attribute");
    }
} 

export async function updateAttribute(form: {name: string, description: string, category: AttributeCategory, updatedAt: Date, id: number}) {
    try {
        const token = getToken();
        const {id, name, category, description, updatedAt} = form;
        const res = await fetch(`${BASE_URL}/attributes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, category, updatedAt }),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, message: error.error || "Failed to update attribute"};
        }
        return {success: true, message: "Attribute updated successfully"};
    } catch(err:any) {
        throw new Error(err.message || "Failed to update attribute");
    }
}