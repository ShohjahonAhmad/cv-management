import type { UpdateProfile } from "~/types/Profile";
import { getToken, isAuthorized } from "./getAttributes";
import { success } from "zod";

const BASE_URL = import.meta.env.VITE_API_URL;
export default async function getUsers(page: number) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/users?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if(!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to fetch users");
        }
        const data = await res.json();
        return data;
    } catch(err:any) {
        window.location.href = "/login";
    }
}

export async function getProfile() {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/candidate/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            throw new Error(error.message || "Failed to fetch profile");
        }
        return await res.json();;
    } catch(err:any) {
        throw new Error(err.message || "Failed to fetch profile");
    }
}

export async function updateProfile(profile: UpdateProfile) {
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/candidate/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profile),
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, error: error.error || "Failed to update profile"};
        }
        const {message} = await res.json();

        return {success: true, message };
    } catch(err:any) {
        throw new Error(err.message || "Failed to update profile");
    }
}

export async function uploadAvatar(formData: FormData){
    try {
        const token = getToken();
        const res = await fetch(`${BASE_URL}/candidate/profile/avatar`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, error: error.error || "Failed to upload avatar"};
        }

        return await res.json(); 
    } catch(err: any) {
        return {success: false, error: err.message || "Failed to upload avatar" };
    }
}

type UploadImageResponse =
    | { success: true; imageUrl: string }
    | { success: false; error: string };

export async function uploadImage(formData: FormData, id: number | string): Promise<UploadImageResponse> {
    try{
        const token = getToken();
        const res = await fetch(`${BASE_URL}/candidate/profile/image/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if(!res.ok) {
            isAuthorized(res.status);
            const error = await res.json();
            return {success: false, error: error.error || "Failed to upload image"};
        }

        return await res.json();
    } catch(err: any) {
        return {success: false, error: err.message || "Failed to upload image" };
    }
}