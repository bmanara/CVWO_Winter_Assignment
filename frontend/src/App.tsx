import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import './App.css';
import AppRoutes from "./components/AppRoutes"
import NavBar from "./components/NavBar";
import { API_URL } from "./constants"

interface userProps {
    id: number;
    username: string;
    password_digest: string;
    created_at: string;
    updated_at: string;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<userProps | {}>({});

    const handleLogin = (data: any) => {
        console.log("Structure of data:", data);
        setIsLoggedIn(true);
        setUser(data.user);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    }

    const loginStatus = () => {
        axios.post(`${API_URL}/logged_in`,
                {withCredentials: true})
        .then(response => {
        if (response.data.logged_in) {
            handleLogin(response);
        } else {
            handleLogout();
        }
        })
        .catch(error => console.log('API errors:', error))
    }

    useEffect(() => { 
        loginStatus();
    }, []);

    return (
        <Router>
            <div className="container">
                <h1>Web Forum</h1>
                <p>Find this layout in frontend/src/App.tsx</p>
                <NavBar user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <AppRoutes user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>
        </Router>
    )
}

export default App
