import { API_URL } from "../constants";

async function fetchUser(user_id: number) {
    const response = await fetch(`${API_URL}/users/${user_id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deleteUser(user_id: number) {
    const response = await fetch(`${API_URL}/users/${user_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.status === 204 ? null : response.json();
}

export { fetchUser, deleteUser }