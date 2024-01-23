import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { fetchUser } from "../../services/userService";

import { LoginProps, UserProps } from"../../types";

import { Button } from '@mui/material';

export function UserDetails({user_id, isLoggedIn}: LoginProps) {
    const { id } = useParams();
    const [user, setUser] = useState<null | {user: UserProps}>(null);
    const [, setError] = useState("");
    const [loading, setLoading] = useState(true);

    if (user_id != Number(id)) {
        return (
            <h2>Not authorized to view page! Sign in to see your profile!</h2>
        )
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await fetchUser(Number(id));
                setUser(data);
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

    if (loading || !user) {
        return (
            <h2>Loading</h2>
        );
    }

    return (
        <div>
            <h2>{ user['user']['username'] }</h2>

        </div>
    )
}