import React, { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";
import {
  useUserContextStore,
} from "@/store/authStore";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import {
  Answers,
  AppliedSelfAssessment,
  SelfAssessments,
} from "@/app/types/entities";
import LoadingCircle from "../../../skeletons/LoadingCircle";
import SecondaryButton from "../../../general/SecondaryButton";
import PageButton from "../../../general/PageButton";
import Button from "../../../general/PrimaryButton";
import SectionP from "./Section";
import {
  AnswerData,
  initialSectionsData,
  initialSectionDataQuestions,
} from "@/app/types/selfAssessmentData";
import toast from "react-hot-toast";
import { useExportStore } from "@/store/excelStore";

interface SelfAssessmentProps {
  appliedSelfAssessment: AppliedSelfAssessment;
  closeModal: () => void;
  onDebugMessage?: (message: DebugMessage) => void;
}

const SelfAssessment: React.FC<SelfAssessmentProps> = ({
  onDebugMessage,
  appliedSelfAssessment,
  closeModal,
}) => {
  const appliedSelfAssessmentsStore = useAppliedSelfAssessmentsStore();
  const exportStore = useExportStore();
  const { currentUser } = useUserContextStore();
  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);

  const [sectionData, setSectionData] = useState<{
    [key: string]: { sectionName: string; questions: string[] };
  }>(initialSectionsData);

  const [allSectionData, setAllSectionData] = useState<AnswerData[][]>(
    initialSectionDataQuestions
  );

  useEffect(() => {
    loadSelfAssessmentData();
  }, []);

  const loadSelfAssessmentData = () => {
    try {
      if (appliedSelfAssessment.rc_selfassessments) {
        setLoadedSelfAssessment(appliedSelfAssessment.rc_selfassessments);
        loadSectionData(appliedSelfAssessment.rc_selfassessments);
        loadAnswersData();
      }
    } catch (error) {
      onDebugMessage({
        content: `Error fetching self-assessment data(loadSelfAssessmentData)=>${error}`,
        type: "Error",
      });
    }
  };

    const loadAnswersData = () => {
      if (!appliedSelfAssessment.rc_answers) return;

      const newSectionData: AnswerData[][] = Array.from({ length: 5 }, () => []);

      appliedSelfAssessment.rc_answers.forEach((answer: Answers, index) => {
        const tableIndex = Math.floor(index / 4);
        const rowIndex = index % 4;

        let proposedActionData = {
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

        const answerData: AnswerData = {
          answer: answer.ANS_Selection === "n" ? 0 : 1,
          url: answer.ANS_WorkDocument ?? "",
          observations: answer.ANS_Observations ?? "",
          responsible: proposedActionData.responsible,
          justification: proposedActionData.justification,
          preview: proposedActionData.preview,
          date: new Date(proposedActionData.date),
        };

        newSectionData[tableIndex][rowIndex] = answerData;
      });
      setAllSectionData(newSectionData);
    };

  const loadSectionData = (selfAssessment: SelfAssessments) => {
    onDebugMessage({
      content: "Loading Section data(loadSectionData)",
      type: "Info",
    });
    if (selfAssessment.rc_sections && selfAssessment.rc_sections.length > 0) {
      const updatedSectionData: {
        [key: string]: { sectionName: string; questions: string[] };
      } = {};
      const updatedSectionAnswers: {
        [key: string]: AnswerData[];
      } = {};
      selfAssessment.rc_sections.forEach((section, index) => {
        const sectionName = section.SEC_Name || `Section ${index + 1}`;
        const questions = section.rc_questions
          ? section.rc_questions.map((question: any) => question.QES_Text)
          : Array.from({ length: 4 }, () => "");
        updatedSectionData[(index + 1).toString()] = {
          sectionName,
          questions,
        };
        updatedSectionAnswers[(index + 1).toString()] =
          initialSectionDataQuestions[index];
      });
      setSectionData(updatedSectionData);
      onDebugMessage({
        content: `Section data loaded correctly(loadSectionData)`,
        type: "Success",
      });
    } else {
      onDebugMessage({
        content:
          "The self-assessment does not have defined sections(loadSectionData)",
        type: "Warning",
      });
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

  const handleExport = async () => {
    const { ASA_Id } = appliedSelfAssessment;
    const result = await exportStore.exportAppliedSelfAssessment(ASA_Id);
    if (result && "error" in result) {
      toast.error("Problems When Exporting!");
      return;
    }
    toast.success("Self-Assessment Exported!");
  };

  const renderTables = () => {
    return allSectionData.map((SectionData, index) => (
      <div
        key={`table-${index + 1}`}
        style={{ display: index === currentPage - 1 ? "block" : "none" }}
      >
        <SectionP
          number={`${currentPage}`}
          sectionData={sectionData[currentPage]}
          initialData={SectionData}
        />
      </div>
    ));
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
      setSaving(false);
      toast.error("Problems Updating Self-Assessment!");
      return;
    }
    setSaving(false);
    toast.success("Revised Self-Assessment!");
    closeModal();
  };

  const date = new Date(appliedSelfAssessment.ASA_Date).toLocaleDateString();

  return (
    <div className="bg-gray-700 w-full rounded-lg p-2  text-center form-control items-center justify-center font-poppins font-semibold drop-shadow-xl">
      <h2 className="text-white text-base">
        {loadedSelfAssessment?.SAT_Audit}
      </h2>
      <h2 className="text-white text-sm ">
        {loadedSelfAssessment?.SAT_Description}
      </h2>
      <div className="flex sm:flex-row sm:space-x-3 space-x-1 rounded-xl bg-gray-700 py-1 w-full sm:px-3 my-1 sm:my-2 items-center justify-center">
        <SecondaryButton
          onClick={handlePrevPage}
          className="rounded-xl text-sm sm:text-base sm:w-20 w-16 h-5 sm:mb-0"
        >
          Previous
        </SecondaryButton>
        <div className="flex sm:space-x-3 space-x-1 rounded-xl bg-gray-800 p-1">
          {[1, 2, 3, 4, 5].map((pageNumber) => (
            <PageButton
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          ))}
        </div>
        <SecondaryButton
          onClick={handleNextPage}
          className="rounded-xl text-sm sm:text-base sm:w-20 h-5 w-16 sm:mb-0"
        >
          Next
        </SecondaryButton>
      </div>
      {renderTables()}
      <div className="flex flex-col lg:flex-row justify-between lg:space-x-80 items-center">
        <div className="text-xs lg:text-sm sm:my-4 my-1 text-center lg:text-left">
          <p>Carried Out By: {appliedSelfAssessment.ASA_MadeBy}</p>
          <p>Date Applied: {date}</p>
          <p>Reviewed By: {appliedSelfAssessment?.ASA_ReviewedBy}</p>
        </div>
        <div className="flex space-x-5">
          {appliedSelfAssessment.ASA_ReviewedBy === "N/A" && (
            <SecondaryButton
              onClick={handleSave}
              className="rounded-xl w-36 lg:w-44 h-8"
            >
              Reviewed
            </SecondaryButton>
          )}
          <Button
            onClick={handleExport}
            className="rounded-xl w-36 lg:w-44 h-8"
          >
            Export
          </Button>
        </div>
      </div>
      {saving && <LoadingCircle text="Sending..." />}
    </div>
  );
};

export default SelfAssessment;
