import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuiz } from "../../services/api";

export default function QuizDetailPage () {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [quiz, setQuiz ] = useState<any[]>(null);

    useEffect(() => {
        if (id) {
            fetchQuiz(Number(id)).then(setQuiz);
        }
    }, [id]);

    if (!quiz) return <p>Loading...</p>

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((q: any) => (
                <div key={q.id}>
                    <h3>{q.text}</h3>
                    {q.options?.map((opt: any) => (
                        <p key={opt.id}>{opt.text} {opt.isCorrect && "(correct)"}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};