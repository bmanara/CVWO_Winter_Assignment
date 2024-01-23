import { Route, Routes } from "react-router-dom";

import PostsList from "../features/posts/PostsList";
import SearchPosts from "../features/posts/SearchPosts";
import PostDetails from "../features/posts/PostDetails";
import { NewPost } from "../features/posts/NewPost";
import { EditPost } from "../features/posts/EditPost";

import { Login } from "../features/users/Login";
import { Signup } from "../features/users/Signup";
import { UserDetails } from "../features/users/UserDetails";

import { StateProps } from "../types";


function AppRoutes({ user, setUser, isLoggedIn, setIsLoggedIn}: StateProps) {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/search/:query" element={<SearchPosts />} />
            <Route path="/posts/new" element={<NewPost user_id={user.id} isLoggedIn={isLoggedIn}/>} /> 
            <Route path="/posts/:id/edit" element={<EditPost user_id={user.id} isLoggedIn={isLoggedIn} />} />
            <Route path="posts/:id" element={<PostDetails user_id={user.id} isLoggedIn={isLoggedIn} />} />
            <Route path="/login" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/signup" element={<Signup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path="/user/:id" element={<UserDetails user_id={user.id} isLoggedIn={isLoggedIn} />}/>
        </Routes>
    );
}

export default AppRoutes;