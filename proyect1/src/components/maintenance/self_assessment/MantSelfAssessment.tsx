"use client";

import React, { useEffect, useState } from "react";
import MantSection from "./MantSection";
import InputForms from "../../forms/InputForms";
import TextArea from "../../forms/TextAreaForms";
import Button from "../../general/PrimaryButton";
import PageButton from "../../general/PageButton";
import SecondaryButton from "../../general/SecondaryButton";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { useSectionStore } from "@/store/sectionStore";
import { useQuestionStore } from "@/store/questionStore";
import {
  SelfAssessments,
  Section,
  Question,
  Parameter,
} from "@/app/types/entities";
import LoadingCircle from "@/components/skeletons/LoadingCircle";
import {
  useParametersContextStore,
  useSelfAssessmentContextStore,
} from "@/store/authStore";
import { useParameterStore } from "@/store/parameterStore";
import { initialSectionsData } from "@/app/types/selfAssessmentData";
import toast from "react-hot-toast";
import { customInfoToast } from "@/components/alerts/InfoAlert";
import { on } from "events";
import { DebugMessage } from "@/app/types/debugData";

interface MantSelfAssessmentProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const MantSelfAssessment: React.FC<MantSelfAssessmentProps> = ({
  onDebugMessage,
}) => {
  const { updateParameter } = useParameterStore();
  const { setCurrentParameters } = useParametersContextStore();
  const { setCurrentSelfAssessment, currentSelfAssessment } =
    useSelfAssessmentContextStore();
  const selfAssessmentStore = useSelfAssessmentsStore();
  const sectionStore = useSectionStore();
  const questionStore = useQuestionStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [audit, setAudit] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loadedSelfAssessment, setLoadedSelfAssessment] =
    useState<SelfAssessments | null>(null);
  const [sectionData, setSectionData] = useState<{
    [key: string]: { sectionName: string; questions: string[] };
  }>(initialSectionsData);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    loadSelfAssessmentData();
  }, []);

  const loadSelfAssessmentData = () => {
    onDebugMessage({
      content: "Loading Self-Assessment data(loadSelfAssessmentData)",
      type: "Info",
    });
    try {
      if (currentSelfAssessment) {
        setLoadedSelfAssessment(currentSelfAssessment);
        setAudit(currentSelfAssessment.SAT_Audit);
        setDescription(currentSelfAssessment.SAT_Description);
        loadSectionData(currentSelfAssessment, setSectionData);
      }
    } catch (error) {
      onDebugMessage({
        content: "Error loading Self-Assessment data(LoadSelfAssessmentData)",
        type: "Error",
      });
      console.error("Error fetching self-assessment data:", error);
    }
  };

  const loadSectionData = (selfAssessment: any, setSectionData: any) => {
    onDebugMessage({
      content: "Loading Section data(loadSectionData)",
      type: "Info",
    });
    if (selfAssessment.rc_sections && selfAssessment.rc_sections.length > 0) {
      const updatedSectionData: {
        [key: string]: { sectionName: string; questions: string[] };
      } = {};
      selfAssessment.rc_sections.forEach((section: any, index: number) => {
        const sectionName = section.SEC_Name;
        const questions = section.rc_questions
          ? section.rc_questions.map((question: any) => question.QES_Text)
          : Array.from({ length: 4 }, () => "");
        updatedSectionData[(index + 1).toString()] = {
          sectionName,
          questions,
        };
      });
      setSectionData(updatedSectionData);
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

  const handleSave = async () => {
    onDebugMessage({
      content: "Saving Self-Assessment data(handleSave)",
      type: "Info",
    });
    if (!verifyFields()) {
      return;
    }
    setSaving(true);
    saveSelfAssessment();
  };

  const saveSelfAssessment = async () => {
    try {
      const updatedSelfAssessment = await updateSelfAssessmentData();
      if ("error" in updatedSelfAssessment) {
        onDebugMessage({
          content: `Error saving the self-assessment(saveSelfAssessment)->${updatedSelfAssessment.error}`,
          type: "Error",
        });
        toast.error("Problems Saving The Self-Assessment!");
        setSaving(false);
        return;
      }
      if (updatedSelfAssessment && updatedSelfAssessment.SAT_Id) {
        for (let index = 0; index < 5; index++) {
          const sectionDataForCurrentIndex =
            sectionData[(index + 1).toString()];
          const updatedSectionResponse = await updateSectionData(
            (index + 1).toString(),
            sectionDataForCurrentIndex.sectionName,
            updatedSelfAssessment.SAT_Id
          );
          if ("error" in updatedSectionResponse) {
            onDebugMessage({
              content: `Error saving the section(saveSelfAssessment)->${updatedSectionResponse.error}`,
              type: "Error",
            });
            toast.error("Problems Saving The Self-Assessment!");
            setSaving(false);
            return;
          }
          if (updatedSectionResponse && updatedSectionResponse.SEC_Id) {
            const updatedQuestionsResponse = await updateQuestionsData(
              updatedSectionResponse.SEC_Id,
              updatedSectionResponse.SEC_Number,
              sectionDataForCurrentIndex.questions
            );
            if ("error" in updatedQuestionsResponse) {
              onDebugMessage({
                content: `Error saving the questions(saveSelfAssessment)->${updatedQuestionsResponse.error}`,
                type: "Error",
              });
              toast.error("Problems Saving The Self-Assessment!");
              setSaving(false);
              return;
            }
          }
        }
        updateParameterData(updatedSelfAssessment.SAT_Id);
        deactivatePrevSelfAssessment();
        setLoadedSelfAssessment(updatedSelfAssessment);
        upSelfAssessmentContext(updatedSelfAssessment.SAT_Id);
      }
      onDebugMessage({
        content: "Self-Assessment saved successfully(saveSelfAssessment)",
        type: "Success",
      });
      setSaving(false);
      toast.success("Saved Self-Assessment!");
    } catch (error) {
      onDebugMessage({
        content: `Error saving the self-assessment(saveSelfAssessment)->${error}`,
        type: "Error",
      });
      toast.error("Problems Saving The Self-Assessment!");
    }
  };

  const upSelfAssessmentContext = async (currentSelfAssessment: number) => {
    onDebugMessage({
      content: "Updating Self-Assessment Context(upSelfAssessmentContext)",
      type: "Info",
    });
    try {
      const selfAssessment =
        await selfAssessmentStore.getCompleteSelfAssessment(
          currentSelfAssessment
        );
      if ("error" in selfAssessment) {
        onDebugMessage({
          content: `Error updating Self-Assessment context(upSelfAssessmentContext)->${selfAssessment.error}`,
          type: "Error",
        });
        toast.error("Problems Saving The Self-Assessment!");
        return;
      }
      onDebugMessage({
        content: "Self-Assessment Context updated successfully(upSelfAssessmentContext)",
        type: "Success",
      });
      setCurrentSelfAssessment(selfAssessment);
    } catch (error) {
      onDebugMessage({
        content: `Error updating Self-Assessment context(upSelfAssessmentContext)->${error}`,
        type: "Error",
      });
      toast.error("Problems Saving The Self-Assessment!");
    }
  };

  const updateParameterData = async (selfAssessment: number) => {
    onDebugMessage({
      content: "Updating Parameter data(updateParameterData)",
      type: "Info",
    });
    const parameterToUpdate: Parameter = {
      PRM_CurrentSelfAssessment: selfAssessment,
    };
    try {
      const result = await updateParameter(parameterToUpdate);
      if ("error" in result) {
        onDebugMessage({
          content: `Error updating Parameter data(updateParameterData)->${result.error}`,
          type: "Error",
        });
        toast.error("Problems Saving The Self-Assessment!");
        return;
      }
      onDebugMessage({
        content: "Parameter data updated successfully(updateParameterData)",
        type: "Success",
      });
      setCurrentParameters(result);
    } catch (error) {
      onDebugMessage({
        content: `Error updating Parameter data(updateParameterData)->${error}`,
        type: "Error",
      });
      toast.error("Problems Saving The Self-Assessment!");
    }
  };

  const deactivatePrevSelfAssessment = async () => {
    if (loadedSelfAssessment) {
      const updatePrevSelfAssessment: SelfAssessments = {
        SAT_Id: loadedSelfAssessment.SAT_Id,
        SAT_Audit: loadedSelfAssessment.SAT_Audit,
        SAT_Description: loadedSelfAssessment.SAT_Description,
        SAT_Status: "I",
      };
      return await selfAssessmentStore.updateSelfAssessment(
        updatePrevSelfAssessment
      );
    }
  };

  const updateSelfAssessmentData = async () => {
    const updatedSelfAssessment: SelfAssessments = {
      SAT_Audit: audit,
      SAT_Description: description,
      SAT_Status: "A",
    };
    return await selfAssessmentStore.saveSelfAssessment(updatedSelfAssessment);
  };

  const updateSectionData = async (
    number: string,
    name: string,
    selfAssessment: number
  ) => {
    const updatedSection: Section = {
      SEC_Name: name,
      SEC_Number: number,
      SEC_SelfAssessments: selfAssessment,
    };
    return await sectionStore.saveSection(updatedSection);
  };

  const updateQuestionsData = async (
    section: number,
    sectionNumber: string,
    questions: string[]
  ) => {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const updatedQuestion: Question = {
        QES_Text: question,
        QES_Number: `${sectionNumber}.${index + 1}`,
        QES_Section: section,
      };
      const updatedQuestionResponse = await questionStore.saveQuestion(
        updatedQuestion
      );
      if ("error" in updatedQuestionResponse) {
        onDebugMessage({
          content: `Error saving question(updateQuestionsData)->${updatedQuestionResponse.error}`,
          type: "Error",
        });
        return updatedQuestionResponse;
      }
    }
    return {};
  };

  const verifyFields = () => {
    if (!audit.trim()) {
      customInfoToast("Please fill in the Audit field");
      return false;
    }

    if (!description.trim()) {
      customInfoToast("Please fill in the Description field");
      return false;
    }

    return verifySectionFields();
  };

  const verifySectionFields = () => {
    for (let key in sectionData) {
      if (!sectionData[key].sectionName.trim()) {
        customInfoToast(`Please fill in the Section Name for Section ${key}`);
        return false;
      }

      for (let question of sectionData[key].questions) {
        if (!question.trim()) {
          customInfoToast(`Please fill in all questions for Section ${key}`);
          return false;
        }
      }
    }

    return true;
  };

  return (
    <div className="form-control sm:my-3 sm:mx-8 sm:py-8 py-2 px-1 sm:px-16 w-full md:w-auto rounded-md items-center justify-center sm:bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h1 className="sm:text-2xl text-white sm:mb-5 mb-2">
        MAINTENANCE OF SELF-ASSESSMENTS
      </h1>
      <div className="w-full mb-4 text-center">
        <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
          <h2 className="text-white text-base">Audit</h2>
        </div>
        <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
          <InputForms
            type={"text"}
            className="w-full rounded-md"
            value={audit}
            onChange={(value) => setAudit(value)}
          />
        </div>
        <div className="bg-gray-700 w-full h-10 py-1 text-center">
          <h2 className="text-white text-base">Description</h2>
        </div>
        <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
          <TextArea
            id={"description"}
            className={"w-full rounded-md"}
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
      </div>
      <MantSection
        number={`${currentPage}`}
        sectionData={sectionData[currentPage.toString()]}
        setSectionData={(data) =>
          setSectionData({ ...sectionData, [currentPage.toString()]: data })
        }
      />
      <div className="flex sm:flex-row sm:space-x-3 space-x-1 rounded-xl bg-gray-700 py-1 px-1 w-full sm:px-3 my-1 sm:my-2 items-center justify-center">
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
              className=""
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
      <div className="flex space-x-40">
        <Button
          className="rounded-xl w-44 sm:mt-4 sm:h-6 h-8"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
      {saving && <LoadingCircle text="Saving..." />}
    </div>
  );
};

export default MantSelfAssessment;
