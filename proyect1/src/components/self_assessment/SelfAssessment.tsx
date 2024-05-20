"use client";
import React, { useState } from "react";
import Button from "../general/PrimaryButton";
import PageButton from "../general/PageButton";
import SecondaryButton from "../general/SecondaryButton";
import Table from "./Table";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
}

interface TableRowData {
  question: string;
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
  proposedActionData?: ProposedActionData;
}

const SelfAssessment: React.FC = () => {
  const currentDate = new Date();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allTableData, setAllTableData] = useState<TableRowData[][]>([
    [
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
    ],
    [
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
    ],
    [
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
    ],
    [
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
    ],
    [
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
      { question: "", checkedIndex: null, textArea1: "", textArea2: "" },
    ],
  ]);

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

  const handleTableDataChange = (pageNumber: number, data: TableRowData[]) => {
    const updatedAllTableData = [...allTableData];
    updatedAllTableData[pageNumber - 1] = data;
    setAllTableData(updatedAllTableData);
  };

  const renderTables = () => {
    return allTableData.map((tableData, index) => (
      <div
        key={`table-${index + 1}`}
        style={{ display: index === currentPage - 1 ? "block" : "none" }}
      >
        <Table
          id={`${index + 1}`}
          onDataChange={(data: TableRowData[]) =>
            handleTableDataChange(currentPage, data)
          }
        />
      </div>
    ));
  };

  return (
    <div className="form-control my-3 mx-8 py-5 px-10 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className=" bg-gray-700 w-full py-3 px-3 items-center justify-center text-center rounded-xl">
        <h1 className="text-2xl text-white mb-2">Institution</h1>
        <h2 className="text-white text-xl mb-1">Audit</h2>
        <h2 className="text-white text-base ">Description</h2>
        <div className="flex w-full space-x-3 rounded-xl bg-gray-700 py-1 px-3 my-2 items-center justify-center">
          <SecondaryButton onClick={handlePrevPage} className="rounded-xl w-20">
            Previous
          </SecondaryButton>
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
          <SecondaryButton onClick={handleNextPage} className="rounded-xl w-20">
            Next
          </SecondaryButton>
        </div>
        {renderTables()}
        <div className="flex mx-16 sm:flex-row flex-col items-center sm:justify-between">
          <div className="text-base my-4">
            <p>Carried out by:</p>
            <p>Reviewed by:</p>
            <p>Date: {currentDate.toLocaleDateString()}</p>
          </div>

          <Button className="rounded-xl w-44 ">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
