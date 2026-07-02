const BASE_URL = import.meta.env.VITE_API_URL;
export default async function getUsers() {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token) window.location.href = "/login";
    try {
        const res = await fetch(`${BASE_URL}/users`, {
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