"use client";
import React, { useState } from "react";
import MantSection from "./MantSection";
import InputForms from "./InputForms";
import TextArea from "./TextAreaForms";
import Button from "./PrimaryButton";
import PageButton from "./PageButton";
import SecondaryButtom from "./SecondaryButton";

const MantSelfAssessment: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sectionData, setSectionData] = useState<{ [key: string]: { sectionName: string; questions: string[] } }>({
        "1": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
        "2": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
        "3": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
        "4": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
        "5": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    });


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

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

    return (
        <div className="form-control my-3 py-8 px-16 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
            <h1 className="text-2xl text-white mb-5">MAINTENANCE OF SELF-ASSESSMENTS</h1>
            <div className="w-full mb-4 text-center">
                <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
                    <h2 className="text-white text-base">Audit</h2>
                </div>
                <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
                    <InputForms type={"text"} className="w-full rounded-md" />
                </div>
                <div className="bg-gray-700 w-full h-10 py-1 text-center">
                    <h2 className="text-white text-base">Description</h2>
                </div>
                <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
                    <TextArea id={"description"} className={"w-full rounded-md"} />
                </div>
            </div>
            {/* Renderiza la sección actual */}
            <MantSection
                number={`1.${currentPage}`}
                sectionData={sectionData[currentPage.toString()]}
                setSectionData={(data) => setSectionData({ ...sectionData, [currentPage.toString()]: data })}
            />
            <div className="flex w-full space-x-3 rounded-xl bg-gray-700 py-1 px-3 my-4 items-center justify-center">
                <SecondaryButtom onClick={handlePrevPage} className="rounded-xl">Previous</SecondaryButtom>
                <div className="space-x-3 rounded-xl bg-gray-800 p-1">
                    {[1, 2, 3, 4, 5].map((pageNumber) => (
                        <PageButton
                            key={pageNumber}
                            pageNumber={pageNumber}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                            className=""
                        />
                    ))}
                </div>
                <SecondaryButtom onClick={handleNextPage} className="rounded-xl">Next</SecondaryButtom>
            </div>
            <Button className="rounded-xl">Save</Button>
        </div>
    );
};

export default MantSelfAssessment;
