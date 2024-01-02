import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">All Forums</Link>
            {" | "}
            <Link to="/new">New Post</Link>
        </nav>
    )
}

export default NavBar