import { Route, Routes } from "react-router-dom";
import React from "react";

import PostsList from "../features/posts/PostsList";
import { NewPost } from "../features/posts/NewPost";
import { EditPost } from "../features/posts/EditPost";
import PostDetails from "../features/posts/PostDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/user/new" element={<h1>Create New User</h1>}/>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/new" element={<NewPost />} /> 
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="posts/:id" element={<PostDetails/>} />
        </Routes>
    );
}

export default AppRoutes;