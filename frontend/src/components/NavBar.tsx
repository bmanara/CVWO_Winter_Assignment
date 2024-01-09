import { Link } from "react-router-dom";

import { StateProps } from "../types";


function NavBar({user, setUser, isLoggedIn, setIsLoggedIn}: StateProps) {
    console.log(user)
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    }
    return (
        <nav>
            {isLoggedIn ? <div>
                              <p>Welcome back, <Link to="/">{user.username}</Link></p>
                          </div>
                        : <div></div>
            }
            
            <Link to="/">All Forums</Link>
            {" | "}
            <Link to="/posts/new">New Post</Link>
            {" | "}
            {isLoggedIn ? <button onClick={handleLogout}>Logout</button>
                        : <Link to="/login">Log In</Link>
            }
            {" | "}
            <Link to="/signup">Sign Up</Link>
        </nav>
    )
}

export default NavBar