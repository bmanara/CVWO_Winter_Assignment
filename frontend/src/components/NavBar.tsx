import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">All Forums</Link>
            {" | "}
            <Link to="/posts/new">New Post</Link>
            {" | "}
            <Link to="/login">Log In</Link>
            {" | "}
            <Link to="/signup">Sign Up</Link>
        </nav>
    )
}

export default NavBar