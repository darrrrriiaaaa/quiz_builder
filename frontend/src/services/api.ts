const PORT = 4000;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:${PORT}`;

export async function fetchQuizzes() {
    const res = await fetch(`${BASE_URL}/quizzes`);
    return res.json();
};

export async function fetchQuiz(id: number) {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`);
    return res.json();
};

export async function createQuiz(payload: any) {
    const res = await fetch(`${BASE_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return res.json();
};

export async function deleteQuiz(id: number) {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`, {
        method: "DELETE",
    });
    if (res.status === 204) {
        return true;
    }
    return res.json();
};