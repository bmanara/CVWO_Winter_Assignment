import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPost, editPost } from "../../services/postService";
import { PostProps, LoginProps } from "../../types";

import { TextField, Button } from "@mui/material";


export function EditPost({user_id, isLoggedIn}: LoginProps) {
    const { id } = useParams();
    const [post, setPost] = useState<null | PostProps>(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(Number(id));
                console.log(data);
                setPost(data['post']);
            } catch (e) {
                console.log("An error occurred.", e);
                setError("An error occurred.");
            } finally {
                setLoading(false);
            }
        }

        fetchCurrentPost();
    }, [id]);

    if (loading || !post) {
        return (
            <h2>Loading...</h2>
        )
    } else if (!isLoggedIn) {
        return (
            <div>
                <h2>You are not signed in! Please sign in if you need to edit your posts!</h2>
            </div>
        )
    } else if (user_id != post['user_id']) {
        return (
            <div>
                <h2>You are not allowed to edit this post!</h2>
            </div>
        )
    }

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const editPostData = {
                title: post['title'],
                body: post['body'],
                user_id: post['user_id']
            };
            
            const json = await editPost(Number(id), editPostData);
            console.log("Success", json);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.log("An error occurred", e);
        }
    };
    
    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="titleInput"
                        label="Title"
                        type="text"
                        margin="normal"
                        value={post['title']}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <TextField
                        id="bodyInput"
                        label="Body"
                        value={post['body']}
                        margin="normal"
                        onChange={(e) => setPost({...post, body: e.target.value})}
                        fullWidth
                        required
                        multiline
                        rows={5}
                    />
                </div>

                <div>
                    <Button variant="contained" type="submit">Edit Post</Button>
                </div>
            </form>
        </div>
    )
}