import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { StateProps } from "../types";
import { fetchAllCategories } from "../services/postService";


function NavBar({user, setUser, isLoggedIn, setIsLoggedIn}: StateProps) {
    console.log(user)
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    }

    const [categories, setCategories] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [, setError] = useState<null | string>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch(e) {
                setError("An error occurred with categories.");
            }
        }
        loadCategories();
    }, []);

    const handleSearch = async () => {
        navigate(`/search/${search}`);
    }

    return (
        <nav>
            {isLoggedIn ? <div>
                              <p>Welcome back, <Link to="/">{user.username}</Link></p>
                          </div>
                        : <Button component={Link} to="/signup">Sign Up</Button>
            }
            {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button>
                        : <Button component={Link} to="/login">Log In</Button>
            }
            <Button component={Link} to="/">All Posts</Button>
            <Button component={Link} to="/posts/new">New Post</Button>            
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
                                categories.map((category_details) => (<MenuItem value={category_details["name"]}>{category_details["name"]}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <Button type="submit" size="large" className="search-btn">Search</Button>
                </form>
            </div>
        </nav>
    )
}

export default NavBar