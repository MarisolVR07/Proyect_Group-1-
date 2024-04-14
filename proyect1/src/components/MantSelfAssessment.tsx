"use client"
import React, { useState } from "react";
import MantSection from "./MantSection";
import InputField from "./InputField";
import TextArea from "./TextArea";

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

    // Calcular el número de sección para la página actual
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
            {/* Renderizar la sección para la página actual */}
            <MantSection key={sectionNumber} number={`1.${sectionNumber}`} />
            {/* Botones de paginación */}
            <div className="mt-4">
                <button onClick={handlePrevPage} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md">Previous</button>
                <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
            </div>
        </div>
    );
};

export default MantSelfAssessment;


