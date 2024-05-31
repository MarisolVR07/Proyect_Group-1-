"use client";
import React, { useEffect, useState } from "react";
import Button from "../../general/PrimaryButton";
import PageButton from "../../general/PageButton";
import SecondaryButton from "../../general/SecondaryButton";
import Table from "./TableReview";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import {
  SelfAssessments,
  Section,
  Question,
  AppliedSelfAssessment,
  Answers,
} from "@/app/types/entities";
import { useUserContextStore } from "@/store/authStore";
import LoadingCircle from "../../skeletons/LoadingCircle";
import {
  TableRowDataReview,
  ProposedActionDataReview,
} from "@/app/types/selfAssessmentData";

interface SelfAssessmentProps {
  appliedSelfAssessment: AppliedSelfAssessment;
  closeModal: () => void;
}

const SelfAssessment: React.FC<SelfAssessmentProps> = ({
  appliedSelfAssessment,
  closeModal,
}) => {
  const initialQuestions = Array.from({ length: 5 }, () => {
    return Array.from({ length: 4 }, () => "");
  });

  const appliedSelfAssessmentsStore = useAppliedSelfAssessmentsStore();
  const selfAssessmentStore = useSelfAssessmentsStore();
  const { currentUser } = useUserContextStore();
  const [questions, setQuestions] = useState<string[][]>(initialQuestions);
  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [tableData, setTableData] = useState<TableRowDataReview[][]>([]);

  useEffect(() => {
    loadSelfAssessmentData();
  }, []);

  const loadSelfAssessmentData = () => {
    try {
      if (appliedSelfAssessment.rc_selfassessments) {
        setLoadedSelfAssessment(appliedSelfAssessment.rc_selfassessments);

        const loadedQuestions: string[][] =
          appliedSelfAssessment.rc_selfassessments.rc_sections?.map(
            (section: Section) =>
              section.rc_questions?.map(
                (question: Question) => question.QES_Text
              ) ?? []
          ) ?? [];

        setQuestions(loadedQuestions);
        console.log(appliedSelfAssessment);
        loadTableData();
      }
    } catch (error) {
      console.error("Error fetching self-assessment data:", error);
    }
  };

  const loadTableData = () => {
    if (!appliedSelfAssessment.rc_answers) return;

    const newTableData: TableRowDataReview[][] = Array.from(
      { length: 5 },
      () => []
    );

    appliedSelfAssessment.rc_answers.forEach((answer: Answers, index) => {
      const tableIndex = Math.floor(index / 4);
      const rowIndex = index % 4;
      let proposedActionData: ProposedActionDataReview = {
        responsible: "",
        justification: "",
        preview: "",
        date: "",
      };

      if (answer.rc_proposedaction && answer.rc_proposedaction.length > 0) {
        proposedActionData = {
          responsible: answer.rc_proposedaction[0].PAC_Responsible ?? "",
          justification: answer.rc_proposedaction[0].PAC_Justification ?? "",
          preview: answer.rc_proposedaction[0].PAC_Preview ?? "",
          date: answer.rc_proposedaction[0].PAC_Date ?? "",
        };
      }

      const tableRowData: TableRowDataReview = {
        answer: answer.ANS_Selection === "n" ? "No" : "Yes",
        reference: answer.ANS_WorkDocument ?? "",
        observation: answer.ANS_Observations ?? "",
        ProposedActionDataReview: proposedActionData,
      };

      newTableData[tableIndex][rowIndex] = tableRowData;
    });

    setTableData(newTableData);
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

  const handleSave = async () => {
    setSaving(true);
    const appliedSelfAssessmentReviewed: AppliedSelfAssessment = {
      ASA_Id: appliedSelfAssessment.ASA_Id,
      ASA_ReviewedBy: currentUser?.USR_FullName ?? null,
    };

    const respASA =
      await appliedSelfAssessmentsStore.updateAppliedSelfAssessment(
        appliedSelfAssessmentReviewed
      );
    if ("error" in respASA) {
      alert("Error update appliedSelfAssessment");
      setSaving(false);
      return;
    }
    setSaving(false);
    alert("Self-assessment sent");
    closeModal();
  };

  const renderTables = () => {
    return tableData.map((data, index) => (
      <div
        key={`table-${index + 1}`}
        style={{ display: index === currentPage - 1 ? "block" : "none" }}
      >
        <Table
          questions={questions[index]}
          data={data}
          section={loadedSelfAssessment?.rc_sections?.[index]?.SEC_Name}
          id={`${index + 1}`}
        />
      </div>
    ));
  };

  return (
    <div className=" bg-gray-700 w-full py-3 px-3 items-center justify-center text-center rounded-xl">
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
          <p>Carried Out By: {appliedSelfAssessment.ASA_MadeBy}</p>
          <p>Date Applied: {appliedSelfAssessment.ASA_Date}</p>
          <p>Reviewed By: {appliedSelfAssessment?.ASA_ReviewedBy}</p>
        </div>
        <div className="flex space-x-5">
          {appliedSelfAssessment.ASA_ReviewedBy === "N/A" && (
            <SecondaryButton onClick={handleSave} className="rounded-xl w-44">
              Reviewed
            </SecondaryButton>
          )}
          <Button className="rounded-xl w-44">Export</Button>
        </div>
      </div>
      {saving && <LoadingCircle text="Sending..." />}
    </div>
  );
};

export default SelfAssessment;
