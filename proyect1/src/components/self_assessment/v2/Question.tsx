import React, { useEffect, useState, ChangeEvent } from "react";
import InputForm from "../../forms/InputForms";
import TextArea from "../../forms/TextAreaForms";
import CheckBox from "./CheckBox";
import { AnswerData } from "@/app/types/selfAssessmentData";
import DateTimePicker from "../../general/DateTimePicker";

interface QuestionProps {
  number: string;
  question: string;
  onDataChange?: (data: AnswerData) => void;
  initialData: AnswerData;
  isUnanswered: boolean;
}

const Question: React.FC<QuestionProps> = ({
  number,
  question,
  initialData,
  onDataChange,
  isUnanswered,
}) => {
  const [answerData, setAnswerData] = useState<AnswerData>(initialData);

  const handleAnswerChange = (newAnswer: number) => {
    setAnswerData((prevData) => ({
      ...prevData,
      answer: newAnswer,
    }));
  };

  const handleObservationChange = (value: string) => {
    setAnswerData((prevData) => ({
      ...prevData,
      observations: value,
    }));
  };

  const handleUrlChange = (value: string) => {
    setAnswerData((prevData) => ({
      ...prevData,
      url: value,
    }));
  };

  const handleResponsibleChange = (value: string) => {
    setAnswerData((prevData) => ({
      ...prevData,
      responsible: value,
    }));
  };

  const handleJustificationChange = (value: string) => {
    setAnswerData((prevData) => ({
      ...prevData,
      justification: value,
    }));
  };

  const handlePreviewChange = (value: string) => {
    setAnswerData((prevData) => ({
      ...prevData,
      preview: value,
    }));
  };

  const handleDateChange = (newDate: Date | null) => {
    setAnswerData((prevData) => ({
      ...prevData,
      date: newDate,
    }));
  };

  useEffect(() => {
    onDataChange?.(answerData);
  }, [answerData]);

  return (
    <div
      className={`bg-gray-800 w-full px-3 py-3 rounded-xl ${
        isUnanswered ? "ring-2 ring-red-500" : ""
      }`}
    >
      <p className="text-white text-start">{`${number} - ${question}`}</p>
      <div className="flex space-x-7 items-center justify-center text-white mt-2">
        <div className="items-center justify-center border p-2 rounded-xl">
          <p>Yes</p>
          <CheckBox
            onChange={() => handleAnswerChange(0)}
            checked={answerData.answer === 0}
            className="w-7 h-7 hover:border-violet-700"
          />
        </div>
        <div className="items-center justify-center border p-2 rounded-xl">
          <p>No</p>
          <CheckBox
            onChange={() => handleAnswerChange(1)}
            checked={answerData.answer === 1}
            className="w-7 h-7 hover:border-violet-700"
          />
        </div>
      </div>
      <div className="space-y-2 mt-2 text-center">
        <div>
          <p className="text-white text-xs lg:text-sm">Observations</p>
          <TextArea
            id={`${number}.Ob`}
            placeholder="Observations"
            className="w-full rounded-xl h-auto hover:ring-violet-600"
            value={answerData.observations}
            onChange={(value) => handleObservationChange(value)}
          />
        </div>
        <div>
          <p className="text-white text-xs lg:text-sm">Work Papers URL</p>
          <InputForm
            type="text"
            placeholder="Work Papers URL"
            className="w-full rounded-xl hover:ring-violet-600"
            value={answerData.url}
            onChange={(value) => handleUrlChange(value)}
          />
        </div>
      </div>
      {answerData.answer === 1 && (
        <div className="bg-gray-700 mt-3 rounded-xl py-2">
          <p className="text-white text-base py-2">Proposed Action</p>
          <div className="flex space-x-5 px-4">
            <div>
              <p className="text-white text-xs lg:text-sm">Date</p>
              <DateTimePicker
                className="hover:ring-violet-600 hover:ring-2 hover:rounded-lg"
                value={answerData.date}
                onChange={handleDateChange}
              />
            </div>
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Responsible</p>
              <InputForm
                type="text"
                placeholder="Responsible"
                className="w-full rounded-xl hover:ring-violet-600"
                value={answerData.responsible}
                onChange={(value) => handleResponsibleChange(value)}
              />
            </div>
          </div>
          <div className="flex space-x-5 px-4 mt-2">
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Justification</p>
              <TextArea
                id={`${number}.Jus`}
                placeholder="Justification"
                className="w-full rounded-xl hover:ring-violet-600"
                value={answerData.justification}
                onChange={(value) => handleJustificationChange(value)}
              />
            </div>
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Preview</p>
              <TextArea
                id={`${number}.Prev`}
                placeholder="Preview"
                className="w-full rounded-xl hover:ring-violet-600"
                value={answerData.preview}
                onChange={(value) => handlePreviewChange(value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
