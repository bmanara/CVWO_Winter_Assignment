import { API_URL } from "../constants";

interface PostProps {
    "title": string;
    "body": string;
    "user_id": number;
}

async function createPost(data: PostProps) {
    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

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

async function editPost(id: number, data: PostProps) {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
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

export { createPost, fetchAllPosts, fetchPost, editPost, deletePost }