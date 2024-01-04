import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
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
                setError("An error occurred.");
                console.log("An error occurred:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentPost();
    }, [id]);

    const deletePost = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Successfully deleted post.");
                navigate(`/`);
            } else {
                throw response;
            }
        } catch (e) {
            console.error(e);
        }
    }

    if (loading || !post) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div>
            <h2>{ post["title"] }</h2>
            <p>{ post["body"] }</p>
            <Link to={`/posts/${post["id"]}/edit`}>
                Edit Post
            </Link>
            {" | "}
            <button onClick={ deletePost }>Delete</button>
            {" | "}
            <Link to="/">Back to Posts</Link>
        </div>
    )
}

export default PostDetails;