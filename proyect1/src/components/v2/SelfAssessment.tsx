"use client";
import React, { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";
import {
  useParametersContextStore,
  useSelfAssessmentContextStore,
  useUserContextStore,
} from "@/store/authStore";
import { useProposedActionsStore } from "@/store/proposedactionStore";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import { useAnswersStore } from "@/store/answerStore";
import {
  Parameter,
  Question,
  Section,
  SelfAssessments,
  User,
} from "@/app/types/entities";
import LoadingCircle from "../skeletons/LoadingCircle";
import SecondaryButton from "../general/SecondaryButton";
import PageButton from "../general/PageButton";
import Button from "../general/PrimaryButton";

interface SelfAssessmentProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const SelfAssessment: React.FC<SelfAssessmentProps> = ({ onDebugMessage }) => {
  const { currentSelfAssessment } = useSelfAssessmentContextStore();
  const { currentUser } = useUserContextStore();
  const { currentParameters } = useParametersContextStore();
  const currentDate = new Date();
  const appliedSelfAssessmentsStore = useAppliedSelfAssessmentsStore();
  const proposedActionStore = useProposedActionsStore();
  const answerStore = useAnswersStore();

  const [selfAssessmentStatus, setSelfAssessmentStatus] =
    useState<boolean>(false);
  const [questions, setQuestions] = useState<string[][]>();
  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [parameters, setParameters] = useState<Parameter | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    checkSelfAssessmentStatus();
    loadSelfAssessmentData();
    setParameters(currentParameters);
    setUser(currentUser);
  }, []);

  const checkSelfAssessmentStatus = async () => {
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

  const handleSave = async () => {
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
