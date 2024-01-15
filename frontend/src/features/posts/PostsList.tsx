import { useState, useEffect } from 'react';
import { fetchAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";


function PostsList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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

    if (loading || !posts.length ) {
        return (
            <h2>Loading...</h2>
        )
    }

    return (
        <div>
            { posts.map((post) => (
                <Link key={ post['id'] } className="fill-div"  to={`/posts/${post['id']}`}>
                    <div className="post">
                        <h2 className="title">
                            { post['title'] }                        
                        </h2>
                        <pre>
                        { post['body'].length > 1000 ? <p className="body">{ post['body'].slice(0, 1000) }...</p>
                                                   : <p className="body">{ post['body'] }</p>}
                        </pre>
                        <h5>By: { post['username'] }</h5>
                    </div>
                </Link>
            )) }
        </div>
    )
}

export default PostsList;