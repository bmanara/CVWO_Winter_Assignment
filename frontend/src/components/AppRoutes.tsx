import { Route, Routes } from "react-router-dom";
import React from "react";

import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import { NewPost } from "../features/posts/NewPost";
import { EditPost } from "../features/posts/EditPost";

import { Login } from "../features/users/Login";
import { Signup } from "../features/users/Signup";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/new" element={<NewPost />} /> 
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="posts/:id" element={<PostDetails/>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
        </Routes>
    );
}

export default AppRoutes;