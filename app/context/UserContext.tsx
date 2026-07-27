import { createContext, useContext } from "react";
import type { Role } from "~/types/Role";

export type ProfileUser = {
  firstName: string;
  lastName: string;
  role: Role;
};

const UserContext = createContext<ProfileUser | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);

  if (ctx === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }

  return ctx;
}

export default UserContext;
