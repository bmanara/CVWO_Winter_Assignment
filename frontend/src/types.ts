export interface PostProps {
    "title": string;
    "body": string;
    "user_id": number;
}

export interface PostDetailsProps {
    "id": number;
    "title": string;
    "body": string;
    "created_at": string;
    "updated_at": string;
    "user_id": number;
}

export interface UserProps {
    id: number;
    username: string;
    password_digest?: string;
    created_at?: string;
    updated_at?: string;
}

export interface StateProps {
    user: UserProps;
    setUser: (user: UserProps) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface LoginProps {
    user_id: number;
    isLoggedIn: boolean;
}

export interface CommentProps {
    body: string;
    post_id?: string;
    user_id: string;
}