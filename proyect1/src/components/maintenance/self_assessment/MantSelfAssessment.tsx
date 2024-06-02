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

const MantSelfAssessment: React.FC = () => {
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

  const customInfoToast = (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } px-1 py-2 bg-white shadow-lg justify-center items-center rounded-xl pointer-events-auto flex ring-2 ring-violet-600`}
      >
        <div className="text-base text-center w-5 h-5 rounded-3xl ring-2 ring-violet-600 text-violet-600 mx-1">
          <p className="mb-3">!</p>
        </div>

        <div className="relative flex text-center">
          <p className="text-sm font-semibold text-violet-600">{message}</p>
        </div>
      </div>
    ));
  };

  const loadSelfAssessmentData = () => {
    try {
      if (currentSelfAssessment) {
        setLoadedSelfAssessment(currentSelfAssessment);
        setAudit(currentSelfAssessment.SAT_Audit);
        setDescription(currentSelfAssessment.SAT_Description);
        loadSectionData(currentSelfAssessment, setSectionData);
      }
    } catch (error) {
      console.error("Error fetching self-assessment data:", error);
    }
  };

  const loadSectionData = (selfAssessment: any, setSectionData: any) => {
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
      console.warn("The self-assessment does not have defined sections.");
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
      setSaving(false);
      toast.success("Saved Self-Assessment!");
    } catch (error) {
      toast.error("Problems Saving The Self-Assessment!");
    }
  };

  const upSelfAssessmentContext = async (currentSelfAssessment: number) => {
    try {
      const selfAssessment =
        await selfAssessmentStore.getCompleteSelfAssessment(
          currentSelfAssessment
        );
      if ("error" in selfAssessment) {
        toast.error("Problems Saving The Self-Assessment!");
        return;
      }
      setCurrentSelfAssessment(selfAssessment);
    } catch (error) {
      toast.error("Problems Saving The Self-Assessment!");
    }
  };

  const updateParameterData = async (selfAssessment: number) => {
    const parameterToUpdate: Parameter = {
      PRM_CurrentSelfAssessment: selfAssessment,
    };
    try {
      const result = await updateParameter(parameterToUpdate);
      if ("error" in result) {
        toast.error("Problems Saving The Self-Assessment!");
        return;
      }
      setCurrentParameters(result);
    } catch (error) {
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
    <div className="form-control my-3 mx-8 py-8 px-4 md:px-16 w-full md:w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h1 className="text-2xl text-white mb-5">
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
      <div className="flex flex-wrap justify-between space-x-0 md:space-x-3 rounded-xl bg-gray-700 py-1 px-3 my-4 items-center">
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
      <div className="flex space-x-40">
        <Button className="rounded-xl w-44 mt-4" onClick={handleSave}>
          Save
        </Button>
      </div>
      {saving && <LoadingCircle text="Saving..." />}
    </div>
  );
};

export default MantSelfAssessment;
