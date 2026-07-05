const BASE_URL = import.meta.env.VITE_API_URL;
export default async function getAttributes(page: number) {
    const token = localStorage.getItem("token");
    console.log(token);
    if(!token) window.location.href = "/login";

    try {
        const res = await fetch(`${BASE_URL}/attributes?page=${page}`, {
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
        return false;
    }
    return true;
}