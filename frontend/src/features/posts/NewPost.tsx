import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

import { createPost } from "../../services/postService";
import { LoginProps } from "../../types";

export function NewPost({user_id, isLoggedIn}: LoginProps) {
    if (!isLoggedIn) {
        return (
            <div>
                <h2>You are not signed in! Please sign in if you want to post!</h2>
            </div>
        )
    }
    
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

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField 
                        id="titleInput" 
                        type="text"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        required
                    />
                </div>

                <div>
                    <TextField
                        id="bodyInput"
                        value={body}
                        label="Body"
                        onChange={(e) => setBody(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={5}
                    />
                </div>

                <div>
                    <Button variant="contained" type="submit">Create Post</Button>
                </div>
            </form>
        </div>
    )
}

