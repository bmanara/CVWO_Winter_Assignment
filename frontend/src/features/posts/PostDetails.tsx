import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, deletePost } from "../../services/postService";
import { PostDetailsProps } from "../../types";


function PostDetails({user_id}: {user_id: number}) {
    const [author, setAuthor] = useState("");
    const [post, setPost] = useState<null | PostDetailsProps>(null);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try {
                const data = await fetchPost(Number(id));
                setPost(data.post);
                setAuthor(data.username);
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
            <h2>{ post["title"] } posted by: {author}</h2>
            <p>{ post["body"] }</p>
            { user_id === post["user_id"] ? <div>
                                            <Link to={`/posts/${post["id"]}/edit`}>
                                                Edit Post
                                            </Link>
                                            <button onClick={ handleDeletePost }>Delete</button>
                                            <Link to="/">Back to Posts</Link>
                                            </div>
                                            :<div><Link to="/">Back to Posts</Link></div>
            }
        </div>
    )
}

export default PostDetails;