import React from "react";
import TextArea from "./TextArea";

interface MantQuestionProps {
    number: string;
}

const MantQuestion: React.FC<MantQuestionProps> = ({ number }) => {
    return (
        <>
            <div className="flex ">
                <h1 className="p-5">{number}</h1>
                <div>
                    <TextArea id={"1.1.1"} />
                </div>
            </div>
        </>
    );
};

export default MantQuestion;