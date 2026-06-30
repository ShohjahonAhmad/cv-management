import { redirect } from "react-router";
import type { Route } from "./+types/callback";

export async function clientLoader({ url }: Route.LoaderArgs) {
  const token = url.searchParams.get("token");
  if (!token) {
    throw redirect("/login");
  }

  localStorage.setItem("token", token);
  throw redirect("/");
}

export default function Callback() {
  return <h1>Callback</h1>;
}
