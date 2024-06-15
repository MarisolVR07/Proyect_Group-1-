import React, { useState, useEffect } from "react";
import Question from "./Question";
import { AnswerData } from "@/app/types/selfAssessmentData";

interface SectionProps {
  number: string;
  sectionData: { sectionName: string; questions: string[] };
  onDataChange: (data: AnswerData[]) => void;
  initialData: AnswerData[];
}

const Section: React.FC<SectionProps> = ({
  number,
  sectionData,
  onDataChange,
  initialData,
}) => {
  const [answers, setAnswers] = useState<AnswerData[]>(initialData);

  useEffect(() => {
    onDataChange(answers);
  }, [answers]);

  const handleQuestionDataChange = (index: number, data: AnswerData) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = data;
      return newAnswers;
    });
  };

  const renderQuestions = () => {
    return answers.map((data, index) => (
      <div key={index}>
        <Question
          number={`${number}.${index + 1}`}
          question={sectionData.questions[index]}
          initialData={data}
          onDataChange={(newData) => handleQuestionDataChange(index, newData)}
        />
        {index !== sectionData.questions.length - 1 && (
          <div className="w-full bg-violet-900 my-3 h-1"></div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full text-center">
      <div className="bg-gray-800 w-full rounded-xl text-center py-1 mb-2">
        <p className="text-xl text-white">{sectionData.sectionName}</p>
      </div>
        {renderQuestions()}
    </div>
  );
};

export default Section;
