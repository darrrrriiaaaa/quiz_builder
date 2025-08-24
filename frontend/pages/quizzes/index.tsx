import React, { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../../services/api";
import QuizListItem from "../../components/QuizListItem";
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
        <div>
            <h1>All Quizzes</h1>
            {quizzes.map((q) => (
                <div key={q.id} onClick={() => navigate(`/quizzes/${q.id}`)}>
                    <QuizListItem {...q} onDelete={handleDelete} />
                </div>
            ))}
        </div>
    )
}