import { API_URL } from "../constants";

async function fetchAllPosts() {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function fetchPost(id: number) {
    const response = await fetch(`${API_URL}/posts/${id}`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

async function deletePost(id: number) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
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

export { fetchAllPosts, fetchPost, deletePost }