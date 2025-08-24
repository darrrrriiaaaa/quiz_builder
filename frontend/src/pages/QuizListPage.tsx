import React, { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../services/api.ts";
import QuizListItem from "../components/QuizListItem.tsx";
import { useNavigate } from "react-router-dom";

export default function QuizListPage() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const navigate = useNavigate();

    const loadQuizzes = async() => {
        const data = await fetchQuizzes();
        setQuizzes(data);
    };

    useEffect(() => {
        loadQuizzes();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteQuiz(id);
        loadQuizzes();
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">All Quizzes</h1>
            
            <button onClick={() => navigate("/create")}>Create new quiz</button>
            
            {quizzes.length === 0 && <p className="text-gray-500">No quizzes yet!</p>}

            <div className="space-y-4">
                {quizzes.map((q) => (
                    <QuizListItem
                        key={q.id}
                        id={q.id}
                        title={q.title}
                        questionsCount={q.questionsCount}
                        onDelete={handleDelete}
                        onOpen={() => navigate(`/quizzes/${q.id}`)}
                    />
                ))}
            </div>
        </div>
    )
}