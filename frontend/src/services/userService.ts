import { API_URL } from "../constants";

async function fetchUser(user_id: number) {
    const response = await fetch(`${API_URL}/users/${user_id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export { fetchUser }