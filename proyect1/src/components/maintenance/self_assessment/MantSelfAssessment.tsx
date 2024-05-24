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
import { SelfAssessments, Section, Question } from "@/app/types/entities";
import LoadingCircle from "@/components/skeletons/LoadingCircle";

const MantSelfAssessment: React.FC = () => {
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
  }>({
    "1": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "2": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "3": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "4": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "5": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  });
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    loadSelfAssessmentData();
  }, []);

  const loadSelfAssessmentData = async () => {
    try {
      const selfAssessment =
        await selfAssessmentStore.getCompleteSelfAssessment(1);
      if (!("error" in selfAssessment)) {
        setLoadedSelfAssessment(selfAssessment);
        setAudit(selfAssessment.SAT_Audit);
        setDescription(selfAssessment.SAT_Description);
        loadSectionData(selfAssessment, setSectionData);
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
      console.warn("La autoevaluación no tiene secciones definidas.");
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
    updateSelfAssessment();
  };

  const updateSelfAssessment = async () => {
    try {
      if (loadedSelfAssessment && loadedSelfAssessment.rc_sections) {
        const updatedSelfAssessment = await updateSelfAssessmentData();
        if (updatedSelfAssessment && "error" in updatedSelfAssessment) {
          setSaving(false);
          alert("Error updating the self-assessment");
          return;
        }

        for (
          let index = 0;
          index < loadedSelfAssessment.rc_sections.length;
          index++
        ) {
          const sectionSAT = loadedSelfAssessment.rc_sections[index];
          const sectionDataForCurrentIndex =
            sectionData[(index + 1).toString()];

          const updatedSectionResponse = await updateSectionData(
            sectionSAT,
            sectionDataForCurrentIndex,
            index
          );
          if ("error" in updatedSectionResponse) {
            setSaving(false);
            alert("Error updating section: " + index);
            return;
          }

          if (sectionSAT.rc_questions && sectionSAT.rc_questions.length > 0) {
            const updatedQuestionsResponse = await updateQuestionsData(
              sectionSAT,
              sectionDataForCurrentIndex
            );
            if ("error" in updatedQuestionsResponse) {
              setSaving(false);
              alert("Error updating section questions: " + index);
              return;
            }
          }
        }
        setSaving(false);
        alert("Form submitted successfully!");
      }
    } catch (error) {
      setSaving(false);
      console.error("Error updating the self-assessment:", error);
    }
  };

  const updateSelfAssessmentData = async () => {
    if (!loadedSelfAssessment) {
      return null;
    }

    const updatedSelfAssessment: SelfAssessments = {
      SAT_Id: loadedSelfAssessment.SAT_Id,
      SAT_Audit: audit,
      SAT_Description: description,
    };
    return await selfAssessmentStore.updateSelfAssessment(
      updatedSelfAssessment
    );
  };

  const updateSectionData = async (
    sectionSAT: Section,
    sectionDataForCurrentIndex: { sectionName: string; questions: string[] },
    index: number
  ) => {
    const updatedSection: Section = {
      SEC_Id: sectionSAT.SEC_Id,
      SEC_Name: sectionDataForCurrentIndex.sectionName,
      SEC_Number: sectionSAT.SEC_Number,
      SEC_SelfAssessments: sectionSAT.SEC_SelfAssessments,
    };
    return await sectionStore.updateSection(updatedSection);
  };

  const updateQuestionsData = async (
    sectionSAT: Section,
    sectionDataForCurrentIndex: { sectionName: string; questions: string[] }
  ) => {
    if (sectionSAT.rc_questions) {
      for (let qIndex = 0; qIndex < sectionSAT.rc_questions.length; qIndex++) {
        const questionSAT = sectionSAT.rc_questions[qIndex];
        const updatedQuestion: Question = {
          QES_Id: questionSAT.QES_Id,
          QES_Text: sectionDataForCurrentIndex.questions[qIndex],
          QES_Number: questionSAT.QES_Number,
          QES_Section: questionSAT.QES_Section,
        };
        const updatedQuestionResponse = await questionStore.updateQuestion(
          updatedQuestion
        );
        if ("error" in updatedQuestionResponse) {
          return updatedQuestionResponse;
        }
      }
    }
    return {};
  };

  const verifyFields = () => {
    if (!audit.trim()) {
      alert("Please fill in the Audit field.");
      return false;
    }

    if (!description.trim()) {
      alert("Please fill in the Description field.");
      return false;
    }

    return verifySectionFields();
  };

  const verifySectionFields = () => {
    for (let key in sectionData) {
      if (!sectionData[key].sectionName.trim()) {
        alert(`Please fill in the Section Name for Section ${key}.`);
        return false;
      }

      for (let question of sectionData[key].questions) {
        if (!question.trim()) {
          alert(`Please fill in all questions for Section ${key}.`);
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
