import React from "react";
import InputForm from "../../forms/InputForms";
import TextArea from "../../forms/TextAreaForms";

interface MantSectionProps {
  number: string;
  sectionData: { sectionName: string; questions: string[] };
  setSectionData: (data: { sectionName: string; questions: string[] }) => void;
}

const MantSection: React.FC<MantSectionProps> = ({
  number,
  sectionData,
  setSectionData,
}) => {
  const handleSectionNameChange = (value: string) => {
    setSectionData({ ...sectionData, sectionName: value });
  };

  const handleQuestionTextChange = (value: string, index: number) => {
    const updatedQuestions = [...sectionData.questions];
    updatedQuestions[index] = value;
    setSectionData({ ...sectionData, questions: updatedQuestions });
  };

  return (
    <div className="w-full text-center">
      <div className="bg-gray-700 w-full h-10 p-1 text-center">
        <h2 className="text-white text-base">Section</h2>
      </div>
      <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
        <InputForm
          label={number}
          type={"text"}
          value={sectionData.sectionName}
          onChange={handleSectionNameChange}
          className="w-full"
        />
      </div>
      <div className="bg-gray-700 w-full py-2 h-10">
        <h2 className="text-white text-base">Questions</h2>
      </div>
      <div className="bg-gray-700 w-full px-3 pb-3 mb-1 rounded-b-xl">
        {sectionData.questions.map((question, index) => (
          <TextArea
            key={index}
            id={`${number}.${index + 1}`}
            spam={`${number}.${index + 1}`}
            value={question}
            onChange={(value) => handleQuestionTextChange(value, index)}
            className="w-full mb-1"
          />
        ))}
      </div>
    </div>
  );
};

export default MantSection;
