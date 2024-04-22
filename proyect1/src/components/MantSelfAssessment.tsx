"use client"
import React, { useState } from "react";
import MantSection from "./MantSection";
import InputField from "./InputField";
import TextArea from "./TextArea";
import Button from "./Button";

const MantSelfAssessment: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleNextPage = () => {
        if (currentPage < 5) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const sectionNumber = currentPage;

    return (
        <div className="form-control p-6 w-full items-center justify-center bg-slate-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
            <h1>Maintenance of Self-Assessments</h1>
            <div className="flex">
                <h2 className="pt-5 pe-4">Audit:</h2>
                <InputField label={""} type={"text"} placeholder={"Audit"} />
            </div>
            <div className="flex">
                <h2 className="pt-5 pe-4">Description:</h2>
                <TextArea id={"description"} />
            </div>
            <MantSection key={sectionNumber} number={`1.${sectionNumber}`} />
            <div className="space-x-3">
                <button onClick={handlePrevPage} className="bg-blue-500 text-white rounded-md w-20 h-8">Previous</button>
                <Button>
                    Save
                </Button>
                <button onClick={handleNextPage} className="bg-blue-500 text-white rounded-md w-20 h-8">Next</button>
            </div>
        </div>
    );
};

export default MantSelfAssessment;


