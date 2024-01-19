import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { searchPosts } from "../../services/postService";


import { FormControl, InputLabel, Select, Button, MenuItem } from "@mui/material";

function SearchPosts() {
    const [posts, setPosts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);

    const { query } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadPosts() {
            try {
                const data = await searchPosts(query);
                setPosts(data);
            } catch (e) {
                setError("An error occurred");
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric'})
    }

    const handleSearch = async () => {
        navigate(`/search/${search}`);
    }

    if (loading) {
        return (
            <h2>Loading...</h2>
        )
    } else if (!posts.length) {
        return (
            <h2>No posts made in this category. Be the first!</h2>
        )
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSearch}>
                    <FormControl sx={{ m: 1, minWidth: 400 }}>
                        <InputLabel id="search-label">Search by Category</InputLabel>
                        <Select
                            labelId="search-label"
                            id="search-select"
                            value={search}
                            label="Search by Category"
                            onChange={(e) => setSearch(e.target.value)}
                        >
                            <MenuItem value="others">Others</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit">Search</Button>
                </form>
                
            </div>
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
                        <h5>By: { post['username'] } | Posted on: { formatDate(post['created_at']) }</h5>
                    </div>
                </Link>
            )) }
        </div>
    )
}

export default SearchPosts;