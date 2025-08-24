import React, { useState } from "react";
import QuestionInput from "./QuestionInput.tsx";
import { createQuiz } from "../services/api.ts";

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
        <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto space-y-4">
            <input
                type="text"
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 border rounded"
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
            <div className="flex gap-2">
                <button type="button" onClick={addQuestion}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add question
                </button>
                <button type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Create quiz
                </button>
            </div>
        </form>
    )
};