import type { Provider, Role } from "./Role";

export type SelectedUser = {
    id: number;
    updatedAt: string; 
}

export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isBlocked: boolean;
    role: Role
    provider: Provider;
    createdAt: string;
    updatedAt: string;
    photoUrl?: string;
    location?: string 
}