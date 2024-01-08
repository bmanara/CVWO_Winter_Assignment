import { Route, Routes } from "react-router-dom";

import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import { NewPost } from "../features/posts/NewPost";
import { EditPost } from "../features/posts/EditPost";

import { Login } from "../features/users/Login";
import { Signup } from "../features/users/Signup";

interface userProps {
    id?: number;
    username?: string;
    password_digest?: string;
    created_at?: string;
    updated_at?: string;
}

interface StateProps {
    user: userProps;
    setUser: (user: userProps) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function AppRoutes({ user, setUser, isLoggedIn, setIsLoggedIn}: StateProps) {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/new" element={<NewPost user_id={user.id} isLoggedIn={isLoggedIn}/>} /> 
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="posts/:id" element={<PostDetails/>} />
            <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/signup" element={<Signup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}/>
        </Routes>
    );
}

export default AppRoutes;