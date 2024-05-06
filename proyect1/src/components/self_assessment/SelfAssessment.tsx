"use client";
import React, { useState } from "react";
import MantSection from "./Section";
import InputForms from "../forms/InputForms";
import TextArea from "../forms/TextAreaForms";
import Button from "../general/PrimaryButton";
import PageButton from "../general/PageButton";
import SecondaryButtom from "../general/SecondaryButton";
import PrimaryButton from "../general/PrimaryButton";
import DownArrowIcon from "../svg/DownArrowIcon";
import DropdownMenu from "../general/DropdownMenu";
import DateTimePicker from "../general/DateTimePicker";
import Table from "./Table";

const SelfAssessment: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sectionData, setSectionData] = useState<{
    [key: string]: { sectionName: string; questions: string[] };
  }>({
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
      <div className=" bg-gray-700 w-full py-3 px-3 items-center justify-center text-center rounded-xl">
        <h1 className="text-2xl text-white my-3">Institution</h1>
        <h2 className="text-white text-xl mb-1">Audit</h2>
        <h2 className="text-white text-base ">Description</h2>
        <div className="flex w-full space-x-3 rounded-xl bg-gray-700 py-1 px-3 my-4 items-center justify-center">
          <SecondaryButtom onClick={handlePrevPage} className="rounded-xl w-20">
            Previous
          </SecondaryButtom>
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
          <SecondaryButtom onClick={handleNextPage} className="rounded-xl w-20">
            Next
          </SecondaryButtom>
        </div>
        <Table number={`1.${currentPage}`} />
        <div className="flex mx-16 sm:flex-row flex-col items-center sm:justify-between">
          <div className="text-base my-4">
            <p>Carried out by:</p>
            <p>Reviewed by:</p>
            <p>Date:</p>
          </div>

          <Button className="rounded-xl w-44 ">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
