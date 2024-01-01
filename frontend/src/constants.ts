export const API_URL = process.env.NODE_ENV === "test" 
                                                ? "http://fake-url" 
                                                : import.meta.env.VITE_API_URL;

