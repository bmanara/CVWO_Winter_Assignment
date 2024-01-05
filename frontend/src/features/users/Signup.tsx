import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../constants";

export function Signup() {
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
                this.props.handleLogin(response.data)
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
                    <label htmlFor="usernameInput">Enter your username:</label>
                    <input 
                        id="usernameInput"
                        type="text"
                        value={userData['username']}
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="passwordInput">Enter your password:</label>
                    <input 
                        id="passwordInput"
                        type="password"
                        value={userData['password']}
                        onChange={(e) => setUserData({...userData, password: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="passwordConfirmationInput">Enter your password:</label>
                    <input 
                        id="passwordConfirmationInput"
                        type="password"
                        value={userData['password_confirmation']}
                        onChange={(e) => setUserData({...userData, password_confirmation: e.target.value})}
                    />
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}