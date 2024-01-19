import { useState, useEffect } from 'react';
import { fetchAllPosts, fetchAllCategories } from "../../services/postService";
import { Link, useNavigate } from "react-router-dom";

import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";


function PostsList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [, setError] = useState<null | string>(null);
    const navigate = useNavigate();

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
        async function loadCategories() {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
                console.log(data);
            } catch (e) {
                setError("An error occured");
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
        loadCategories();
    }, []);

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric'})
    }

    const handleSearch = async () => {
        navigate(`/search/${search}`);
    }
    

    if (loading || !posts.length ) {
        return (
            <h2>Loading...</h2>
        )
    }

    // TODO: Make search select more responsive. (Do not hardcode MenuItems)
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
                            {
                                categories.map((category_details) => (<MenuItem value={ category_details['name'] }>{ category_details["name"] }</MenuItem>))
                            }
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

export default PostsList;