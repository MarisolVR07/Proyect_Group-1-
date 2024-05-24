"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/PrimaryButton";
import PageButton from "../general/PageButton";
import SecondaryButton from "../general/SecondaryButton";
import Table from "./Table";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { useParameterStore } from "@/store/parameterStore";
import { Parameter } from "@/app/types/entities";
import { SelfAssessments, Section, Question } from "@/app/types/entities";
import { useAuthStore } from "@/store/authStore";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
}

interface TableRowData {
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
  proposedActionData?: ProposedActionData;
}

const SelfAssessment: React.FC = () => {
  const currentDate = new Date();
  const selfAssessmentStore = useSelfAssessmentsStore();
  const parameterStore = useParameterStore();
  const { currentUser } = useAuthStore();

  const initialQuestions = Array.from({ length: 5 }, () => {
    return Array.from({ length: 4 }, () => "");
  });

  const [questions, setQuestions] = useState<string[][]>(initialQuestions);

  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);

  const [loadedParameter, setLoadedParameter] = useState<Parameter | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allTableData, setAllTableData] = useState<TableRowData[][]>([
    [
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
    ],
    [
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
    ],
    [
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
    ],
    [
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
    ],
    [
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
      {
        checkedIndex: null,
        textArea1: "",
        textArea2: "",
        proposedActionData: {
          responsible: "",
          justification: "",
          preview: "",
          date: null,
        },
      },
    ],
  ]);

  useEffect(() => {
    loadParameterData();
    loadSelfAssessmentData();
  }, []);

  const loadParameterData = async () => {
    try {
      const params = await parameterStore.getParameter(1);
      if (!("error" in params)) {
        setLoadedParameter(params);
      }
    } catch (error) {
      console.error("Failed to fetch parameters:", error);
    }
  };

  const loadSelfAssessmentData = async () => {
    try {
      const selfAssessment =
        await selfAssessmentStore.getCompleteSelfAssessment(1);
      if (!("error" in selfAssessment)) {
        setLoadedSelfAssessment(selfAssessment);

        const loadedQuestions: string[][] =
          selfAssessment.rc_sections?.map(
            (section: Section) =>
              section.rc_questions?.map(
                (question: Question) => question.QES_Text
              ) ?? []
          ) ?? [];

        setQuestions(loadedQuestions);
      } else {
        console.error(
          "Error al cargar la autoevaluación:",
          selfAssessment.error
        );
      }
    } catch (error) {
      console.error("Error fetching self-assessment data:", error);
    }
  };

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

  const handleSave = () => {
    const allSelected = allTableData.every((tableData) =>
      tableData.every((row) => row.checkedIndex !== null)
    );

    if (allSelected) {
      // Aquí iría la lógica para guardar la autoevaluación
      console.log("Todos los ítems están seleccionados. Guardando...");
    } else {
      alert("Por favor, asegúrese de que todos los ítems estén seleccionados.");
    }
    console.log(allTableData);
  };

  const renderTables = () => {
    return allTableData.map((tableData, index) => (
      <div
        key={`table-${index + 1}`}
        style={{ display: index === currentPage - 1 ? "block" : "none" }}
      >
        <Table
          questions={questions[index]}
          initialData={tableData}
          section={loadedSelfAssessment?.rc_sections?.[index]?.SEC_Name}
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
        <h1 className="text-2xl text-white mb-2">
          {loadedParameter?.PRM_Institution}
        </h1>
        <h2 className="text-white text-xl mb-1">
          {loadedSelfAssessment?.SAT_Audit}
        </h2>
        <h2 className="text-white text-base ">
          {loadedSelfAssessment?.SAT_Description}
        </h2>
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
            <p>Carried out by: {currentUser?.USR_FullName}</p>
            <p>Date: {currentDate.toLocaleDateString()}</p>
          </div>
          <Button onClick={handleSave} className="rounded-xl w-44">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelfAssessment;
