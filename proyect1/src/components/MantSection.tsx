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
                <MantQuestion key={'${number}.1'} number={`${number}.1`} />
                <MantQuestion key={'${number}.2'} number={`${number}.2`} />
                <MantQuestion key={'${number}.3'} number={`${number}.3`} />
                <MantQuestion key={'${number}.4'} number={`${number}.4`} />
            </div>
        </>
    );
};
export default MantSection;