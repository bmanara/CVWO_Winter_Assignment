import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom"
import { API_URL } from "../../constants";


export function NewPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent redirect
        e.preventDefault();

        const newPostData = { title, body };

        const response = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( newPostData )
        });
        
        if (response.ok) {
            const { id } = await response.json();
            navigate(`/posts/${id}`);
        } else {
            console.log("An error occured.");
        }
    }

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                        id="titleInput" 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <input 
                        id="bodyInput"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Create Post</button>
                </div>
            </form>
        </div>
    )
}

