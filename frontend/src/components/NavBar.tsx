import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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
            
            <Button component={Link} to="/">All Forums</Button>
            {" | "}
            <Button component={Link} to="/posts/new">New Post</Button>
            {" | "}
            {isLoggedIn ? <button onClick={handleLogout}>Logout</button>
                        : <Button component={Link} to="/login">Log In</Button>
            }
            {" | "}
            <Button component={Link} to="/signup">Sign Up</Button>
        </nav>
    )
}

export default NavBar