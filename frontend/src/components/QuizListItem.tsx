import React from "react";
import { deleteQuiz } from "../services/api.ts";
import { useNavigate } from "react-router-dom";

type Props = {
    id: number;
    title: string;
    questionsCount: number;
    onDelete: (id: number) => void;
    onOpen: () => void;
};

const QuizListItem: React.FC<Props> = ({ id, title, questionsCount, onDelete, onOpen }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        if (!id) return;
        await deleteQuiz(Number(id));
        navigate("/");
    };

    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition flex justify-between items-center">
            <h2 onClick={onOpen}
                className="text-xl font-semibold cursor-pointer hover:underline">
                {title}
            </h2>
            <p className="text-gray-600">Amount of questions: {questionsCount}</p>
            <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
    );
};

export default QuizListItem;