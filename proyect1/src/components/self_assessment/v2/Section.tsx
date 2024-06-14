import React from "react";
import Question from "./Question";


interface SectionProps {
  number: string;
  sectionData: { sectionName: string; questions: string[] };
}

const Section: React.FC<SectionProps> = ({
  number,
  sectionData,
}) => {

  return (
    <div className="w-full text-center">
      <div className="bg-gray-800 w-full rounded-xl text-center py-1">
        <p className="text-xl text-white">{sectionData.sectionName}</p>
      </div>
      <div className="w-full my-3 space-y-7 ">
        {sectionData.questions.map((question, index) => (
          <>
            <Question
              number={`${number}.${index + 1}`}
              question={question}
              key={index}
            />
            <div className="w-full bg-violet-900 h-1"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Section;
