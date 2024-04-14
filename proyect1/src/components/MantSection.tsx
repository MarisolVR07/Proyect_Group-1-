"use client"
import React, { useState } from "react";
import InputField from "./InputField";
import SmallButton from "./SmallButton";
import MantQuestion from "./MantQuestion";

interface MantSectionProps {
    number: string;
}

const MantSection: React.FC<MantSectionProps> = ({ number }) => {
    const [questionCount, setQuestionCount] = useState<number>(1);

    const handleAddQuestion = () => {
        setQuestionCount(questionCount + 1);
    };

    const handleRemoveQuestion = () => {
        if (questionCount > 1) {
            setQuestionCount(questionCount - 1);
        }
    };
    return (
        <>
            <div className="flex">
                <h1 className="pt-10 pe-4">Section Name:</h1>
                <div>
                    <InputField label={ number }
                    type={"text"}
                    placeholder={"Section"}/>
                </div>
            </div>
            <div>
                <h2>Questions</h2>
                {[...Array(questionCount)].map((_, index) => (
                    <MantQuestion key={index} number={`1.1.${index + 1}`} />
                ))}
                <div className="space-x-3">
                    <SmallButton onClick={handleRemoveQuestion}>-</SmallButton>
                    <SmallButton onClick={handleAddQuestion}>+</SmallButton>
                </div>
            </div>
        </>
    );
};

export default MantSection;