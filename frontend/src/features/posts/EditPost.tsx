import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

interface PostProps {
    "id": number;
    "title": string;
    "body": string;
    "created_at": string;
    "updated_at": string;
}


export function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState<null | PostProps>(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const response = await fetch(`${API_URL}/posts/${id}`);
                if (response.ok) {
                    const json = await response.json();
                    setPost(json);
                } else {
                    throw response;
                }
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
                body: post['body']
            };

            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( editPostData )
            });
            
            if (response.ok) {
                const json = await response.json();
                console.log("Success", json);
                navigate(`/posts/${id}`);
            } else {
                throw response;
            }
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