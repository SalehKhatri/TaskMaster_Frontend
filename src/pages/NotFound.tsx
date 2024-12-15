import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center font-primary">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
                <p className="text-lg text-gray-500 mt-2 font-secondary">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-3 text-lg font-secondary text-white bg-black rounded-lg shadow-md hover:bg-black/80 transition-colors"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
