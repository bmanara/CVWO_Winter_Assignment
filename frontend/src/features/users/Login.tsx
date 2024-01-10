import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

import { Box, TextField, Button } from "@mui/material"

interface FunctionProps {
    setUser: (user: object) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export function Login({setIsLoggedIn, setUser}: FunctionProps) {
    const [userData, setUserData] = useState({username: '', password: ''});
    const [, setError] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            username: userData['username'],
            password: userData['password']
        };

        axios.post(`${API_URL}/login`, 
                    {user}, 
                    {withCredentials: true})
        .then(response => {
            if (response.data.logged_in) {
                setIsLoggedIn(true);
                setUser(response.data.user)
                navigate("/");
            } else {
                setError(response.data.errors);
                console.log("ERROR", response.data.errors);
            }
        })
        .catch(error => console.log('API errors:', error))
    };

    return (
        <Box>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        id="usernameInput"
                        type="text"
                        label="Username"
                        margin="normal"
                        value={userData['username']}
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                    />
                </div>

                <div>
                    <TextField
                        id="passwordInput"
                        type="password"
                        label="Password"
                        margin="normal"
                        value={userData['password']}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                    />
                </div>

                <div>
                    <Button variant="contained" type="submit">Log In</Button>
                </div>
            </form>
        </Box>
    )
}

