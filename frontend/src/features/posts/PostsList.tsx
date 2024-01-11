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
                console.log(data);
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
                <div key={ post['id'] } className="post">
                    <h2 className="title">
                        <Link to={`/posts/${post['id']}`}>
                            { post['title'] }
                        </Link>
                    </h2>
                    <p className="body">{ post['body'] }</p>
                    <h5>By: { post['username'] }</h5>
                </div>
            )) }
        </div>
    )
}

export default PostsList;