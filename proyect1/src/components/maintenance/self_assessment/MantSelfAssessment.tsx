"use client";

import React, { useState } from "react";
import MantSection from "./MantSection";
import InputForms from "../../forms/InputForms";
import TextArea from "../../forms/TextAreaForms";
import Button from "../../general/PrimaryButton";
import PageButton from "../../general/PageButton";
import SecondaryButtom from "../../general/SecondaryButton";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { useSectionStore } from "@/store/sectionStore";
import { useQuestionStore } from "@/store/questionStore";
import { SelfAssessments, Section, Question } from "@/app/types/entities";

const MantSelfAssessment: React.FC = () => {
  const selfAssessmentStore = useSelfAssessmentsStore();
  const sectionStore = useSectionStore();
  const questionStore = useQuestionStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [audit, setAudit] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sectionData, setSectionData] = useState<{
    [key: string]: { sectionName: string; questions: string[] };
  }>({
    "1": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "2": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "3": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "4": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
    "5": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  });

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
    if (!audit.trim()) {
      alert("Please fill in the Audit field.");
      return;
    }

    if (!description.trim()) {
      alert("Please fill in the Description field.");
      return;
    }

    for (let key in sectionData) {
      if (!sectionData[key].sectionName.trim()) {
        alert(`Please fill in the Section Name for Section ${key}.`);
        return;
      }

      for (let question of sectionData[key].questions) {
        if (!question.trim()) {
          alert(`Please fill in all questions for Section ${key}.`);
          return;
        }
      }
    }

    const selfAssessmentData: SelfAssessments = {
      SAT_Audit: audit.trim(),
      SAT_Description: description.trim(),
    };

    const savedSelfAssessment = await selfAssessmentStore.saveSelfAssessment(
      selfAssessmentData
    );

    if ("error" in savedSelfAssessment) {
      alert(
        "Error al guardar la autoevaluación. Por favor, inténtelo de nuevo."
      );
      return;
    }
    const selfAssessmentId = savedSelfAssessment.SAT_Id;

    for (let key in sectionData) {
      const sectionName = sectionData[key].sectionName.trim();

      const sectionDataItem: Section = {
        SEC_Name: sectionName,
        SEC_Number: key,
        SEC_SelfAssessments:
          selfAssessmentId !== undefined ? selfAssessmentId : null,
      };

      const savedSection = await sectionStore.saveSection(sectionDataItem);

      if ("error" in savedSection) {
        alert("Error al guardar la seccion.");
        return;
      }

      const sectionQuestions = sectionData[key].questions.map(
        (questionText, index) => {
          const questionData: Question = {
            QES_Number: `${savedSection.SEC_Number}.${index + 1}`,
            QES_Text: questionText.trim(),
            QES_Section:
              savedSection.SEC_Id !== undefined ? savedSection.SEC_Id : null,
          };

          return questionData;
        }
      );

      for (let question of sectionQuestions) {
        const savedQuestion = await questionStore.saveQuestion(question);

        if ("error" in savedQuestion) {
          alert("Error al guardar la pregunta.");
          return;
        }
      }
    }

    alert("Form submitted successfully!");
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
        <SecondaryButtom onClick={handlePrevPage} className="rounded-xl w-20">
          Previous
        </SecondaryButtom>
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
        <SecondaryButtom onClick={handleNextPage} className="rounded-xl w-20">
          Next
        </SecondaryButtom>
      </div>
      <div className="flex space-x-40">
        <Button className="rounded-xl w-44 mt-4" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default MantSelfAssessment;
