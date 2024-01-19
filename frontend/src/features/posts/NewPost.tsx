import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";

import { createPost, fetchAllCategories } from "../../services/postService";
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
    const [category_id, setCategoryId] = useState("");
    const [categories, setCategories] = useState<any[]>([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<null |string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
                console.log(data);
            } catch (e) {
                setError("An error occured");
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent redirect
        e.preventDefault();
        try {
            const newPostData = { title, body, user_id, category_id };
            const { id } = await createPost(newPostData);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.log("An error occurred.", e);
        }
    }

    // TODO: add cateogry into the form
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
                    <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                        labelId="category-label"
                        id="category-select"
                        value={category_id}
                        label="Category"
                        onChange={(e) => setCategoryId(e.target.value)}>
                            {
                                categories.map((category_details) => (<MenuItem value={ category_details['id'] }>{ category_details['name'] }</MenuItem>))
                            }
                        </Select>
                    </FormControl>
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

