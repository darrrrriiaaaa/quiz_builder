import React, { useState } from "react";
import QuestionInput from "./QuestionInput";
import { createQuiz } from "../services/api";

export default function QuizForm() {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState<any[]>([]);

    const addQuestion = () => setQuestions([...questions, {text: "", type: "INPUT", options: [] }]);
    const removeQuestion = (index: number) => setQuestions(questions.filter((_, i) => i !== index));
    const updateQuestion = (index: number, question: any) => {
        const newQuestions = [...questions];
        newQuestions[index] = question;
        setQuestions(newQuestions);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createQuiz({ title, questions });
        alert("Quiz created successfully!");
        setTitle("");
        setQuestions([]);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {questions.map((q,i) => (
                <QuestionInput
                    key={i}
                    index={i}
                    question={q}
                    onChange={updateQuestion}
                    onRemove={removeQuestion}
                />
            ))}
            <button type="button" onClick={addQuestion}>Add question</button>
            <button type="submit">Create quiz</button>
        </form>
    )
};