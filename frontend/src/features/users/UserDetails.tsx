import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { fetchUser, deleteUser } from "../../services/userService";

import { DeleteProps, UserProps } from"../../types";

import { Button } from '@mui/material';

export function UserDetails({user_id, setUser, setIsLoggedIn}: DeleteProps) {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState<null | {user: UserProps}>(null);
    const [, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    if (user_id != Number(id)) {
        return (
            <h2>Not authorized to view page! Sign in to see your profile!</h2>
        )
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await fetchUser(Number(id));
                setUserDetails(data);
                console.log("Running");
                console.log(data);
            } catch (e) {
                setError("An error occurred.");
                console.log("An erroro occurred: ", e);
            } finally {
                setLoading(false);
            }
        }
        fetchCurrentUser();
    }, [id]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    }

    const handleDeleteUser = async () => {
        try {
            await deleteUser(Number(id));
            handleLogout();
            navigate(`/`)
        } catch (e) {
            console.error("Failed to delete user.", e);
        }
    }

    if (loading || !userDetails) {
        return (
            <h2>Loading</h2>
        );
    }

    return (
        <div>
            <h2>{ userDetails['user']['username'] }</h2>
            <Button id="delete-btn" size="small" onClick={handleDeleteUser}>Delete Account</Button>
        </div>
    )
}