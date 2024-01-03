import React, { useState, useEffect } from "react";
import { useParams, redirect, Link } from "react-router-dom"
import { API_URL } from "../../constants";

interface PostProps {
    "id": number;
    "title": string;
    "body": string;
    "created_at": string;
    "updated_at": string;
}

function PostDetails() {
    const [post, setPost] = useState<null | PostProps>(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const { id } = useParams();

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
                setError("An error occured.");
                console.log("An error occured:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentPost();
    }, [id]);

    if (loading || !post) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div>
            <h2>{ post["title"] }</h2>
            <p>{ post["body"] }</p>
            <Link to="/">Back to Posts</Link>
        </div>
    )
}

export default PostDetails;