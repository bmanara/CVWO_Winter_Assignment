import { Route, Routes } from "react-router-dom";
import React from "react";

import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/new" element={<h1>Create New Post</h1>} /> 
            <Route path="posts/:id" element={<PostDetails/>} />
        </Routes>
    );
}

export default AppRoutes;