import { API_URL } from "../constants";
import { CommentProps } from "../types";



export async function createComment(data: CommentProps) {
    const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json()
;}