import React, { useState } from "react";
import TextArea from "../forms/TextAreaForms";

interface CheckboxProps {
    onChange: (checked: boolean) => void;
    checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
    const handleToggle = () => {
        onChange(!checked);
    };

    return (
        <div
            className={`border border-gray-700 flex items-center justify-center cursor-pointer`}
            onClick={handleToggle}
        >
            {checked && <span className="text-white">X</span>}
        </div>
    );
};

interface MantSectionProps {
    number: string;
    sectionData: { sectionName: string; questions: string[] };
    setSectionData: (data: { sectionName: string; questions: string[] }) => void;
}

const MantSection: React.FC<MantSectionProps> = ({ number, sectionData, setSectionData }) => {
    const [checkboxes, setCheckboxes] = useState<boolean[]>(new Array(24).fill(false));

    const handleCheckboxChange = (checked: boolean, index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes.fill(false);
        newCheckboxes[index] = checked;
        setCheckboxes(newCheckboxes);
    };

    const handleSectionNameChange = (value: string) => {
        setSectionData({ ...sectionData, sectionName: value });
    };

    const handleQuestionTextChange = (value: string, index: number) => {
        const updatedQuestions = [...sectionData.questions];
        updatedQuestions[index] = value;
        setSectionData({ ...sectionData, questions: updatedQuestions });
    };

    return (
        <div className="grid grid-cols-6 bg-gray-800">
            {/* Primera fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">Num.</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">QUESTIONNAIRE</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">YES</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">NO</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">References Work Papers</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2 className="text-xs">Observations</h2>
            </div>

            {/* Segunda fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>{number}</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>Section</h2>
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
            </div>
            <div className="border border-gray-700 flex items-center justify-center">
            </div>

            {/* Tercera fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>{number}.1</h2>
            </div>
            <div className="border border-gray-700">
                <h2>Q1</h2>
            </div>
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 2)} checked={checkboxes[2]} />
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 3)} checked={checkboxes[3]} />
            <TextArea
                id={`Re.${number}.1`}
                className="w-auto"
            />

            <TextArea
                id={`Ob.${number}.1`}
                className="w-auto"
            />

            {/* Cuarta fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>{number}.2</h2>
            </div>
            <div className="border border-gray-700">
                <h2>Q2</h2>
            </div>
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 4)} checked={checkboxes[4]} />
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 5)} checked={checkboxes[5]} />
            <TextArea
                id={`Re.${number}.2`}
                className="w-auto"
            />

            <TextArea
                id={`Ob.${number}.2`}
                className="w-auto"
            />

            {/* Quinta fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>{number}.3</h2>
            </div>
            <div className="border border-gray-700">
                <h2>Q3</h2>
            </div>
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 6)} checked={checkboxes[6]} />
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 7)} checked={checkboxes[7]} />
            <TextArea
                id={`Re.${number}.3`}
                className="w-auto"
            />

            <TextArea
                id={`Ob.${number}.3`}
                className="w-auto"
            />

            {/* Sexta fila */}
            <div className="border border-gray-700 flex items-center justify-center">
                <h2>{number}.4</h2>
            </div>
            <div className="border border-gray-700">
                <h2>Q4</h2>
            </div>
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 8)} checked={checkboxes[8]} />
            <Checkbox onChange={(checked) => handleCheckboxChange(checked, 9)} checked={checkboxes[9]} />

            <TextArea
                id={`Re.${number}.4`}
                className="w-auto"
            />

            <TextArea
                id={`Ob.${number}.4`}
                className="w-auto"
            />
        </div>
    );
};

export default MantSection;
