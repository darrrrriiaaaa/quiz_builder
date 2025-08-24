import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuiz } from "../services/api.ts";

import { deleteQuiz } from "../services/api.ts";

export default function QuizDetailPage () {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [quiz, setQuiz ] = useState<any | null>(null);

    useEffect(() => {
        if (id) {
            fetchQuiz(Number(id)).then(setQuiz);
        }
    }, [id]);
    
    const handleDelete = async () => {
        if (!id) return;
        await deleteQuiz(Number(id));
        navigate("/");
    };

    if (!quiz) return <p>Loading...</p>

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-4">
            <button onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Back
            </button>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            {quiz.questions.map((q: any) => (
                <div key={q.id} className="border p-4 rounded space-y-2">
                    <h3 className="text-xl font-semibold">{q.text}</h3>
                    {q.options?.map((opt: any) => (
                        <p key={opt.id} className={opt.isCorrect ? "font-bold text-green-600" : ""}>
                            {opt.text} {opt.isCorrect && "(correct)"}
                        </p>
                    ))}
                </div>
            ))}
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
        </div>
    );
};