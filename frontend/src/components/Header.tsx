import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header () {
    const navigate = useNavigate();

    return (
        <div className="bg-blue-600 text-white p-4 shadow-md">
            <p
                className="text-xl font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/")}>
                    All Quizzes
            </p>
        </div>
    );
};