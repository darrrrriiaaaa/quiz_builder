import React from "react";

type Props = {
    id: number;
    title: string;
    questionsCount: number;
    onDelete: (id: number) => void;
};

const QuizListItem: React.FC<Props> = ({ id, title, questionsCount, onDelete }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{questionsCount}</p>
            <button onclick={() => onDelete(id)}>Delete</button>
        </div>
    );
};

export default QuizListItem;