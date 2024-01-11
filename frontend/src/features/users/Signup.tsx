import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../constants";

import { Button, TextField } from "@mui/material";

interface FunctionProps {
    setUser: (user: object) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}


export function Signup({setIsLoggedIn, setUser}: FunctionProps) {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        password_confirmation: ''
    })
    const [, setError] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            username: userData['username'],
            password: userData['password'],
            password_confirmation: userData['password_confirmation']
        };

        axios.post(`${API_URL}/users`,
                    {user},
                    {withCredentials: true})
        .then(response => {
            if (response.data.status === 'created') {
                console.log("Successfully created!")
                setIsLoggedIn(true);
                setUser(response.data.user)
                console.log("Successfully Logged In!")
                navigate("/")
            } else {
                setError(response.data.errors)
                console.log("ERROR", response.data.errors);
            }
        })
        .catch(error => console.log('API errors:', error))
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField 
                        id="usernameInput"
                        label="Username"
                        value={userData['username']}
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                        margin="normal"
                    />
                </div>

                <div>
                    <TextField 
                        id="passwordInput"
                        type="password"
                        label="Password"
                        value={userData['password']}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                        margin="normal"
                    />
                </div>

                <div>
                    <TextField 
                        id="passwordConfirmationInput"
                        type="password"
                        label="Confirm Password"
                        value={userData['password_confirmation']}
                        onChange={(e) => setUserData({...userData, password_confirmation: e.target.value})}
                        margin="normal"
                    />
                </div>

                <div>
                    <Button variant="contained" type="submit">Sign Up</Button>
                </div>
            </form>
        </div>
    )
}