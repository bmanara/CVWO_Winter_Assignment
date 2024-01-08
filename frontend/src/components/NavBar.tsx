import { Link } from "react-router-dom";

interface userProps {
    id: number;
    username: string;
    password_digest: string;
    created_at: string;
    updated_at: string;
}

interface StateProps {
    user: userProps | {};
    setUser: (user: object) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

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