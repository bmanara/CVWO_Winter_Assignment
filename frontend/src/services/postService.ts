import { API_URL } from "../constants";
import { PostProps } from "../types"


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

async function searchPosts(query: string | undefined) {
    const response = await fetch(`${API_URL}/search?q=${query}`);
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

async function fetchAllCategories() {
    const response = await fetch(`${API_URL}/categories`)
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export { createPost, fetchAllPosts, searchPosts, fetchPost, editPost, deletePost, fetchAllCategories }