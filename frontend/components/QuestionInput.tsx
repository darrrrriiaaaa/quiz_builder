import React from "react";

type Option = {
    text: string;
    isCorrect: boolean
};

type Props = {
    question: {
        text: string;
        type: "BOOLEAN" | "INPUT" | "CHECKBOX";
        options?: Option[];
    };
    index: number;
    onChange: (index: number, question: any) => void;
    onRemove: (index: number) => void;
};

const QuestionInput: React.FC<Props> = ({ question, index, onChange, onRemove }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Question text"
                value={question.text}
                onChange={(e) => onChange(index, { ...question, text: e.target.value })}
            />
            <select
                value={question.type}
                onChange={(e) => onChange(index, { ...question, type: e.target.value })}
            >
                <option value="BOOLEAN">Boolean</option>
                <option value="INPUT">Input</option>
                <option value="CHECKBOX">Checkbox</option>
            </select>
            <button onClick={() => onRemove(index)}>Remove question</button>
        </div>
    );
};

export default QuestionInput;