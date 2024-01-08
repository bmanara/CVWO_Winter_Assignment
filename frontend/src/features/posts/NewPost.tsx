import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { createPost } from "../../services/postService";


export function NewPost({user_id, isLoggedIn} : {user_id: number; isLoggedIn: boolean}) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent redirect
        e.preventDefault();
        try {
            const newPostData = { title, body, user_id };
            const { id } = await createPost(newPostData);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.log("An error occurred.", e);
        }
    }

    if (!isLoggedIn) {
        return (
            <div>
                <h2>You are not signed in! Please sign in if you want to post!</h2>
            </div>
        )
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
                    <textarea
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

