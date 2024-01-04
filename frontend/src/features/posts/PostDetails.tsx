import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { fetchPost, deletePost } from "../../services/postService";

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
                const data = await fetchPost(Number(id));
                setPost(data);
            } catch (e) {
                setError("An error occurred.");
                console.log("An error occurred:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentPost();
    }, [id]);

    const handleDeletePost = async () => {
        try {
            await deletePost(Number(id));
            navigate("/");
        } catch (e) {
            console.error("Failed to delete post.", e);
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
            <button onClick={ handleDeletePost }>Delete</button>
            {" | "}
            <Link to="/">Back to Posts</Link>
        </div>
    )
}

export default PostDetails;