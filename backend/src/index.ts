import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma";

const PORT = 4000;

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/quizzes", async (req: Request, res: Response) => {
    const { title, questions } = req.body as {
        title: string;
        questions: {
            text: string;
            type: "BOOLEAN" | "INPUT" | "CHECKBOX";
            options?: {
                text: string;
                isCorrect: boolean
            }[];
        }[];
    };

    try {
        const quiz = await prisma.quiz.create({
            data: {
                title,
                questions: {
                    create: questions.map((q) => ({
                        text: q.text,
                        type: q.type,
                        options: {
                            create:
                            q.options?.map((opt) => ({
                                text: opt.text,
                                isCorrect: opt.isCorrect,
                            })) || [],
                        },
                    })),
                },
            },
            include: { questions: { include: { options: true } } },
        });
        res.json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create quiz" });
    };
});

app.get("/quizzes", async (req: Request, res: Response) => {
    const quizzes = await prisma.quiz.findMany({
        include: { questions: true },
    });
    res.json(
        quizzes.map((q: { id: number, title: string, questions: { id: number }[] }) => ({
            id: q.id,
            title: q.title,
            questionsCount: q.questions.length,
        }))
    );
});

app.get("/quizzes/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const quiz = await prisma.quiz.findUnique({
        where: {id},
        include: { questions: { include: { options: true } } },
    });
    if(!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
    };
    res.json(quiz);
});

app.delete("/quizzes/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.quiz.delete({ where: { id }});
        res.json({ message: "Quiz deleted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: "Quiz not found" });
    };
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});