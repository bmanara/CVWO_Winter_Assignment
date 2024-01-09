import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchPost, deletePost } from "../../services/postService";
import { createComment } from "../../services/commentService";
import { PostDetailsProps, LoginProps } from "../../types";


function PostDetails({user_id, isLoggedIn}: LoginProps) {
    const [author, setAuthor] = useState("");
    const [post, setPost] = useState<null | PostDetailsProps>(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
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
                setComments(data.comments);
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

    const handleNewComment = async () => {
        try {
            const newCommentData = {
                body: newComment,
                post_id: id,
                user_id: String(user_id)
            }
            await createComment(newCommentData);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.error("Failed to create new post.", e);
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

            { !isLoggedIn ? <div><h4>Log in to post a comment!</h4></div>
                          : <div className="post-comment-container">
                                <form onSubmit={handleNewComment}>
                                    <label htmlFor="bodyInput">New Comment:</label>
                                    <textarea 
                                        id="bodyInput"
                                        placeholder="Type your comment here!"
                                        onChange={(e) => setNewComment(e.target.value)}
                                        required
                                    />
                                    <button type="submit">Post Comment</button>
                                </form>
                            </div>
            }

            
            
            {comments.length === 0 ? <div>No comments on this post. Be the first!</div>
                                   : <div><h2>Comments:</h2></div>
            }

            <div className="comments-container">
                { comments.map((comment) => (
                    <div key={ comment['id'] } className="comment">
                        <h4 className="comment-user">{comment['user_id']}:</h4>
                        <p className="comment-body">{comment['body']}</p>
                    </div>
                )) }
            </div>
            
        </div>
    )
}

export default PostDetails;