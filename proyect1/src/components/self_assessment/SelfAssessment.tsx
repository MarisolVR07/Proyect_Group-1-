"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/PrimaryButton";
import PageButton from "../general/PageButton";
import SecondaryButton from "../general/SecondaryButton";
import Table from "./Table";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { useAnswersStore } from "@/store/answerStore";
import { useProposedActionsStore } from "@/store/proposedactionStore";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import {
  SelfAssessments,
  Section,
  Question,
  AppliedSelfAssessment,
  Answers,
  ProposedAction,
  Parameter,
} from "@/app/types/entities";
import {
  useUserContextStore,
  useParametersContextStore,
  useSelfAssessmentContextStore,
} from "@/store/authStore";
import LoadingCircle from "../skeletons/LoadingCircle";

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
  const { currentSelfAssessment } = useSelfAssessmentContextStore();
  const currentDate = new Date();
  const selfAssessmentStore = useSelfAssessmentsStore();
  const appliedSelfAssessmentsStore = useAppliedSelfAssessmentsStore();
  const proposedActionStore = useProposedActionsStore();
  const answerStore = useAnswersStore();
  const { currentUser } = useUserContextStore();
  const { currentParameters } = useParametersContextStore();

  const initialQuestions = Array.from({ length: 5 }, () => {
    return Array.from({ length: 4 }, () => "");
  });

  const [questions, setQuestions] = useState<string[][]>(initialQuestions);

  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
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
    loadSelfAssessmentData();
  }, []);

  const loadSelfAssessmentData = async () => {
    try {
      if (currentSelfAssessment) {
        setLoadedSelfAssessment(currentSelfAssessment);

        const loadedQuestions: string[][] =
          currentSelfAssessment.rc_sections?.map(
            (section: Section) =>
              section.rc_questions?.map(
                (question: Question) => question.QES_Text
              ) ?? []
          ) ?? [];

        setQuestions(loadedQuestions);
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

  const handleSave = async () => {
    const allSelected = allTableData.every((tableData) =>
      tableData.every((row) => row.checkedIndex !== null)
    );

    if (allSelected) {
      setSaving(true);
      const appliedSelfAssessment: AppliedSelfAssessment = {
        ASA_Date: currentDate.toISOString() ?? null,
        ASA_ReviewedBy: " ",
        ASA_Status: "A",
        ASA_MadeBy: currentUser?.USR_FullName,
        ASA_Assessment: currentParameters?.PRM_CurrentSelfAssessment,
        ASA_Department: currentUser?.USR_Department,
      };

      const respASA =
        await appliedSelfAssessmentsStore.saveAppliedSelfAssessment(
          appliedSelfAssessment
        );
      if ("error" in respASA) {
        alert("Error saving appliedSelfAssessment");
        setSaving(false);
        return;
      }
      for (const [sectionIndex, tableData] of allTableData.entries()) {
        for (const [questionIndex, rowData] of tableData.entries()) {
          const answer: Answers = {
            ANS_Selection: rowData.checkedIndex === 0 ? "y" : "n",
            ANS_Question: parseInt(
              `${sectionIndex + 1}${questionIndex + 1}`,
              10
            ),
            ANS_SelfAssessment: respASA.ASA_Id,
            ANS_WorkDocument: rowData.textArea1,
            ANS_Observations: rowData.textArea2,
          };

          const respAnswer = await answerStore.saveAnswer(answer);

          if ("error" in respAnswer) {
            alert("Error saving answer");
            setSaving(false);
            return;
          }
          if (rowData.proposedActionData && rowData.proposedActionData.date) {
            const proposedAction: ProposedAction = {
              PAC_Responsible: rowData.proposedActionData.responsible,
              PAC_Justification: rowData.proposedActionData.justification,
              PAC_Preview: rowData.proposedActionData.preview,
              PAC_Date: rowData.proposedActionData.date.toISOString(),
              PAC_Answer: respAnswer.ANS_Id,
              PAC_Status: "A",
            };

            const respProposedAction =
              await proposedActionStore.saveProposedAction(proposedAction);

            if ("error" in respProposedAction) {
              alert("Error saving proposed action");
              setSaving(false);
              return;
            }
          }
        }
      }
      setSaving(false);
      alert("Self-assessment sent");
    } else {
      alert("Please make sure all items are selected.");
    }
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
          {currentParameters?.PRM_Institution}
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
      {saving && <LoadingCircle text="Sending..." />}
    </div>
  );
};

export default SelfAssessment;
