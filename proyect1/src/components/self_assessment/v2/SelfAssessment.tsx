import React, { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";
import {
  useParametersContextStore,
  useSelfAssessmentContextStore,
  useUserContextStore,
} from "@/store/authStore";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import {
  Answers,
  AppliedSelfAssessment,
  Parameter,
  ProposedAction,
  SelfAssessments,
  User,
} from "@/app/types/entities";
import LoadingCircle from "../../skeletons/LoadingCircle";
import SecondaryButton from "../../general/SecondaryButton";
import PageButton from "../../general/PageButton";
import Button from "../../general/PrimaryButton";
import SectionP from "./Section";
import {
  AnswerData,
  initialSectionsData,
  initialSectionDataQuestions,
} from "@/app/types/selfAssessmentData";
import toast from "react-hot-toast";
import { useProposedActionsStore } from "@/store/proposedactionStore";
import { useAnswersStore } from "@/store/answerStore";
import { customInfoToast } from "@/components/alerts/InfoAlert";


interface SelfAssessmentProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const SelfAssessment: React.FC<SelfAssessmentProps> = ({ onDebugMessage }) => {
  const { currentSelfAssessment } = useSelfAssessmentContextStore();
  const { currentUser } = useUserContextStore();
  const { currentParameters } = useParametersContextStore();
  const appliedSelfAssessmentsStore = useAppliedSelfAssessmentsStore();
  const currentDate = new Date();
  const proposedActionStore = useProposedActionsStore();
  const answerStore = useAnswersStore();

  const [selfAssessmentStatus, setSelfAssessmentStatus] =
    useState<boolean>(false);
  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [parameters, setParameters] = useState<Parameter | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);

  const [sectionData, setSectionData] = useState<{
    [key: string]: { sectionName: string; questions: string[] };
  }>(initialSectionsData);

  const [allSectionData, setAllSectionData] = useState<AnswerData[][]>(
    initialSectionDataQuestions
  );

  useEffect(() => {
    checkSelfAssessmentStatus();
    loadSelfAssessmentData();
    setParameters(currentParameters);
    setUser(currentUser);
  }, []);

  const checkSelfAssessmentStatus = async () => {
    onDebugMessage({
      content: `Checking the status of the self-assessment(checkSelfAssessmentStatus)`,
      type: "Info",
    });
    if (currentUser) {
      const department = currentUser.USR_Department || 0;
      const status = "A";
      const selfAssessment =
        await appliedSelfAssessmentsStore.getAppliedSelfAssessmentByDepartmentAndStatus(
          department,
          status
        );
      if ("error" in selfAssessment) {
        setSelfAssessmentStatus(false);
        return false;
      }
      setSelfAssessmentStatus(true);
      return true;
    }
  };

  const loadSelfAssessmentData = () => {
    try {
      if (currentSelfAssessment) {
        setLoadedSelfAssessment(currentSelfAssessment);
        loadSectionData(currentSelfAssessment);
      }
    } catch (error) {
      onDebugMessage({
        content: `Error fetching self-assessment data(loadSelfAssessmentData)=>${error}`,
        type: "Error",
      });
    }
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

  const handleSectionDataChange = (pageNumber: number, data: AnswerData[]) => {
    const updatedAllTableData = [...allSectionData];
    updatedAllTableData[pageNumber - 1] = data;
    setAllSectionData(updatedAllTableData);
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
          onDataChange={(data: AnswerData[]) =>
            handleSectionDataChange(currentPage, data)
          }
        />
      </div>
    ));
  };

  const handleSave = async () => {
    onDebugMessage?.({
      content: `Saving self-assessment(handleSave)`,
      type: "Info",
    });
    if ((await checkSelfAssessmentStatus()) === true) {
      return;
    }

    const allSelected = allSectionData.every((tableData) =>
      tableData.every((row) => row.answer !== null)
    );
    if (!allSelected) {
      customInfoToast("Please Answer All Questions");
      return;
    }

    setSaving(true);
    const appliedSelfAssessment: AppliedSelfAssessment = {
      ASA_Date: currentDate.toISOString() ?? null,
      ASA_ReviewedBy: "N/A",
      ASA_Status: "A",
      ASA_MadeBy: currentUser?.USR_FullName,
      ASA_Assessment: currentParameters?.PRM_CurrentSelfAssessment,
      ASA_Department: currentUser?.USR_Department,
    };

    const respASA = await appliedSelfAssessmentsStore.saveAppliedSelfAssessment(
      appliedSelfAssessment
    );
    if ("error" in respASA) {
      toast.error("Error saving Self-Assessment");
      onDebugMessage({
        content: `Error saving self-assessment(handleSave)=>${respASA.error}`,
        type: "Error",
      });
      setSaving(false);
      return;
    }
    for (const [sectionIndex, tableData] of allSectionData.entries()) {
      for (const [questionIndex, rowData] of tableData.entries()) {
        const answer: Answers = {
          ANS_Selection: rowData.answer === 0 ? "y" : "n",
          ANS_Question:
            loadedSelfAssessment?.rc_sections?.[sectionIndex]?.rc_questions?.[
              questionIndex
            ]?.QES_Id,
          ANS_SelfAssessment: respASA.ASA_Id,
          ANS_WorkDocument: rowData.url,
          ANS_Observations: rowData.observations,
        };

        const respAnswer = await answerStore.saveAnswer(answer);

        if ("error" in respAnswer) {
          toast.error("Error saving Self-Assessment");
          onDebugMessage({
            content: `Error saving self-assessment(handleSave)=>${respAnswer.error}`,
            type: "Error",
          });
          setSaving(false);
          return;
        }
        if (rowData.responsible && rowData.date) {
          const proposedAction: ProposedAction = {
            PAC_Responsible: rowData.responsible,
            PAC_Justification: rowData.justification,
            PAC_Preview: rowData.preview,
            PAC_Date: rowData.date.toISOString(),
            PAC_Answer: respAnswer.ANS_Id,
            PAC_Status: "A",
          };

          const respProposedAction =
            await proposedActionStore.saveProposedAction(proposedAction);

          if ("error" in respProposedAction) {
            toast.error("Error saving Self-Assessment");
            onDebugMessage({
              content: `Error saving self-assessment(handleSave)=>${respProposedAction.error}`,
              type: "Error",
            });
            setSaving(false);
            return;
          }
        }
      }
    }
    setSaving(false);
    toast.success("Self-Assessment sent");
  };

  return (
    <div className="form-control my-3 sm:mx-8 sm:my-1 mx-0 w-auto items-center justify-center font-poppins font-semibold drop-shadow-xl">
      <div className="bg-gray-700 w-full py-3 px-3 items-center justify-center text-center rounded-xl">
        <h1 className="text-2xl text-white sm:mb-2">
          {parameters?.PRM_Institution}
        </h1>
        <h2 className="text-white text-xl sm:mb-1">
          {loadedSelfAssessment?.SAT_Audit}
        </h2>
        <h2 className="text-white text-base ">
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
        <div className="flex flex-col sm:flex-row sm:justify-between mx-4 sm:mx-16 items-center">
          <div className="sm:text-base text-sm sm:my-4 my-1 text-center sm:text-left">
            <p>Carried out by: {user?.USR_FullName}</p>
            <p>Date: {currentDate.toLocaleDateString()}</p>
          </div>
          <Button onClick={handleSave} className="rounded-xl w-44 h-7">
            Send
          </Button>
        </div>
      </div>
      {selfAssessmentStatus && (
        <div className="flex flex-col items-center justify-center h-full rounded-md bg-gray-800 bg-opacity-90 absolute top-0 left-0 right-0 bottom-0 z-50">
          <p className="text-white text-3xl text-center mx-4 sm:mx-0">
            Your department has already carried out the self-assessment
          </p>
        </div>
      )}
      {saving && <LoadingCircle text="Sending..." />}
    </div>
  );
};

export default SelfAssessment;
