// useProtectedRoute.ts
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useProtectedRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        // If no token, redirect to the login page
        if (!token) {
            navigate("/login");
        }
    }, [navigate, token]);

    // If the token is present, we allow the content to be rendered (returning true)
    return token ? true : null; // null means we prevent rendering, true allows it
};

export default useProtectedRoute;
