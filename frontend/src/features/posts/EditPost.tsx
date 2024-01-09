import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPost, editPost } from "../../services/postService";
import { PostProps, LoginProps } from "../../types";


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
                    <label htmlFor="titleInput">Title:</label>
                    <input 
                        id="titleInput"
                        type="text"
                        value={post['title']}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="bodyInput">Body:</label>
                    <textarea
                        id="bodyInput"
                        value={post['body']}
                        onChange={(e) => setPost({...post, body: e.target.value})}
                    />
                </div>

                <div>
                    <button type="submit">Edit Post</button>
                </div>
            </form>
        </div>
    )
}