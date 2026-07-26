import { redirect } from "react-router";
import type { Role } from "~/types/Role";

export function requireRoles(userRole: Role, allowed: Role[]){
    if(!allowed.includes(userRole)){
        throw redirect("/");
    }
}