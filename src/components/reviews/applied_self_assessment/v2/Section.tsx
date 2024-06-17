import React, { useState, useEffect } from "react";
import Question from "./Question";
import { AnswerData } from "@/app/types/selfAssessmentData";

interface SectionProps {
  number: string;
  sectionData: { sectionName: string; questions: string[] };
  initialData: AnswerData[];
}

const Section: React.FC<SectionProps> = ({
  number,
  sectionData,
  initialData,
}) => {

  const renderQuestions = () => {
    return initialData.map((data, index) => (
      <div key={index} className="mb-1">
        <Question
          number={`${number}.${index + 1}`}
          question={sectionData.questions[index]}
          initialData={data}
        />
      </div>
    ));
  };

  return (
    <div className="w-full text-center">
      <div className="bg-gray-800 w-full rounded-xl text-center py-1 mb-2">
        <p className="text-base text-white">{sectionData.sectionName}</p>
      </div>
      {renderQuestions()}
    </div>
  );
};

export default Section;
