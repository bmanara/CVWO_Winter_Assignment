import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { fetchPost, deletePost } from "../../services/postService";
import { createComment, deleteComment } from "../../services/commentService";
import { PostDetailsProps, LoginProps } from "../../types";

import { Button, TextField } from '@mui/material';

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
                console.log(data.post);
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

    const handleDeleteComment = async (comment_id: string) => {
        try {
            await deleteComment(Number(comment_id));
            setComments(comments.filter((comment) => {comment['id'] != comment_id}))
            navigate(`/posts/${id}`);
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
        <div className="post-details">
            <h2>{ post["title"] }</h2>
            <h5>posted by: {author}</h5>
            <pre><p>{ post["body"] }</p></pre>

            { user_id === post["user_id"] ? <div>
                                            <Button component={Link} to={`/posts/${post["id"]}/edit`}>
                                                Edit Post
                                            </Button>
                                            <Button onClick={ handleDeletePost }>Delete</Button>
                                            </div>
                                            :<div></div>
            }

            <div className="post-comment">
                <div className="hr" />
                    <p className="hr-text">Comments</p>
                <div className="hr" />
            </div>

            {comments.length === 0 ? <div><h3>No comments on this post. Be the first!</h3></div>
                                   : <div></div>
            }

            { !isLoggedIn ? <div><h4>Log in to post a comment!</h4></div>
                          : <div className="post-comment-container">
                                <form onSubmit={handleNewComment}>
                                    <TextField 
                                        id="bodyInput"
                                        placeholder="What are your thoughts?"
                                        size="small"
                                        onChange={(e) => setNewComment(e.target.value)}
                                        required
                                    />
                                    <Button variant="outlined" type="submit">Comment</Button>
                                </form>
                            </div>
            }
            
            

            <div className="comments-container">
                { comments.map((comment) => (
                    <div key={ comment['id'] } className="comment">
                        <h4 className="comment-user">{comment['username']}</h4>
                        <p className="comment-body">{comment['body']}</p>
                        { comment['user_id'] == user_id ? <Button size="small" onClick={() => handleDeleteComment(comment['id'])}>Delete</Button>
                                                        : <div></div>}
                    </div>
                )) }
            </div>
            
        </div>
    )
}

export default PostDetails;