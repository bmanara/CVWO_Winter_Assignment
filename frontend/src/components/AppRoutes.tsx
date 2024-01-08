import { Route, Routes } from "react-router-dom";

import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import { NewPost } from "../features/posts/NewPost";
import { EditPost } from "../features/posts/EditPost";

import { Login } from "../features/users/Login";
import { Signup } from "../features/users/Signup";

interface StateProps {
    user: object;
    setUser: (user: object) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function AppRoutes({ user, setUser, isLoggedIn, setIsLoggedIn}: StateProps) {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/new" element={<NewPost isLoggedIn={isLoggedIn}/>} /> 
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="posts/:id" element={<PostDetails/>} />
            <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/signup" element={<Signup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}/>
        </Routes>
    );
}

export default AppRoutes;