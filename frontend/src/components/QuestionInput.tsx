import React from "react";

type Option = {
    text: string;
    isCorrect: boolean
};

type Question = {
    text: string;
    type: "BOOLEAN" | "INPUT" | "CHECKBOX";
    options?: Option[];
    correctAnswer?: string;
};

type Props = {
    question: Question;
    index: number;
    onChange: (index: number, question: any) => void;
    onRemove: (index: number) => void;
};

const QuestionInput: React.FC<Props> = ({ question, index, onChange, onRemove }) => {
    const addOption = () => {
        const newOptions = [ ...(question.options || []), { text: "", isCorrect: false }];
        onChange(index, { ...question, options: newOptions });
    };

    const updateOptions = (optIndex: number, text: string) => {
        const newOptions = [ ...(question.options || [])];
        newOptions[optIndex].text = text;
        onChange(index, { ...question, options: newOptions});
    };

    const removeOption = (optIndex: number) => {
        const newOptions = question.options?.filter((_, i) => i !== optIndex);
        onChange(index, { ...question, options: newOptions });
    };

    const toggleCorrect = (optIndex: number) => {
        const newOptions = [ ...(question.options || [])];
        if (question.type === "BOOLEAN") {
            newOptions.forEach((opt, i) => (opt.isCorrect = i === optIndex));
        } else {
            newOptions[optIndex].isCorrect = !newOptions[optIndex].isCorrect;
        };
        onChange(index, { ...question, options: newOptions});
    };

    return (
        <div className="border p-4 rounded space-y-2">
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Question text"
                    value={question.text}
                    onChange={(e) => onChange(index, { ...question, text: e.target.value })}
                    className="flex-1 p-2 border rounded"
                />
                <select
                    value={question.type}
                    onChange={(e) => onChange(index, { ...question, type: e.target.value })}
                    className="p-2 border rounded"
                >
                    <option value="BOOLEAN">Boolean</option>
                    <option value="INPUT">Input</option>
                    <option value="CHECKBOX">Checkbox</option>
                </select>
                <button onClick={() => onRemove(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Remove question
                </button>
            </div>
            {(question.type === "BOOLEAN" || question.type === "CHECKBOX") && (
                <div className="pl-4 space-y-1">
                    {question.options?.map((opt, i) => (
                        <div key={i} className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Option text"
                                value={opt.text}
                                onChange={(e) => updateOptions(i, e.target.value)}
                                className="flex-1 p-1 border rounded"
                            />
                            <label className="flex items-center gap-1">Correct?
                                <input
                                    type={question.type === "BOOLEAN" ? "radio" : "checkbox"}
                                    checked={opt.isCorrect}
                                    onChange={() => toggleCorrect(i)}
                                    name={question.type === "BOOLEAN" ? `boolean=${index}` : undefined}
                                />
                            </label>
                            <button type="button" onClick={() => removeOption(i)}
                                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400">
                                    Remove option
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addOption} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add option
                    </button>
                </div>
            )}
            {(question.type === "INPUT") && (
                <input
                    type="text"
                    placeholder="Correct answer"
                    value={question.correctAnswer || ""}
                    onChange={(e) => 
                        onChange(index, { ...question, correctAnswer: e.target.value})
                    }
                />
            )}
        </div>
    );
};

export default QuestionInput;