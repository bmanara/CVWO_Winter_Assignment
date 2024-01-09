import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { fetchPost, editPost } from "../../services/postService";
import { PostProps } from "../../types";


export function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState<null | PostProps>(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(Number(id));
                setPost(data);
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