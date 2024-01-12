import { useState, useEffect } from 'react';
import { fetchAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";


function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);

    // Make call API to fetch posts from backend
    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
            } catch (e) {
                setError("An error occurred");
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return (
        <div>
            { posts.map((post) => (
                <Link className="fill-div"  to={`/posts/${post['id']}`}>
                    <div key={ post['id'] } className="post">
                        <h2 className="title">
                            { post['title'] }                        
                        </h2>
                        <p className="body">{ post['body'] }</p>
                        <h5>By: { post['username'] }</h5>
                    </div>
                </Link>
            )) }
        </div>
    )
}

export default PostsList;