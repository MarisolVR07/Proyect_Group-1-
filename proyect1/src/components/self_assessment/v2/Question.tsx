import React, { useState } from "react";
import InputForm from "../../forms/InputForms";
import TextArea from "../../forms/TextAreaForms";
import CheckBox from "./CheckBox";
import { AnswerData } from "@/app/types/selfAssessmentData";
import DateTimePicker from "../../general/DateTimePicker";

interface QuestionProps {
  number: string;
  question: string;
  onDataChange?: (data: AnswerData) => void;
}

const Question: React.FC<QuestionProps> = ({ number, question }) => {
  const [showProposedAction, setShowProposedAction] = useState(true);
  const [answerData, setAnswerData] = useState<AnswerData>();
  const [date, setDate] = useState<Date | null>(null);

  const handleCheckBoxChange = (index: number) => {
    setAnswerData((prevData) => ({
      ...prevData,
      checkedIndex: index === prevData.answer ? null : index,
    }));
  };
  return (
    <div className="bg-gray-800 w-full px-3 py-3 rounded-xl">
      <p className="text-white text-start">{`${number} - ${question}`}</p>
      <div className="flex space-x-7 items-center justify-center text-white mt-2">
        <div className="items-center justify-center border p-2 rounded-xl ">
          <p>Yes</p>
          <CheckBox
            onChange={() => handleCheckBoxChange(0)}
            //checked={answerData.answer === 0}
            className="w-7 h-7 hover:border-violet-700"
          />
        </div>
        <div className="items-center justify-center border p-2 rounded-xl ">
          <p>No</p>
          <CheckBox
            onChange={() => handleCheckBoxChange(1)}
            //checked={answerData.answer === 1}
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
            className="w-full rounded-xl text-wrap hover:ring-violet-600"
          />
        </div>
        <div>
          <p className="text-white text-xs lg:text-sm">Work Papers URL</p>
          <InputForm
            type="text"
            placeholder="Work Papers URL"
            className="w-full rounded-xl text-wrap hover:ring-violet-600"
          />
        </div>
      </div>
      {showProposedAction && (
        <div className="bg-gray-700 mt-3 rounded-xl py-2">
          <p className="text-white text-base py-2">Proposed Action</p>
          <div className="flex space-x-5 px-4">
            <div>
              <p className="text-white text-xs lg:text-sm">Date</p>
              <DateTimePicker
                className="hover:ring-violet-600 hover:ring-2 hover:rounded-lg"
                value={date}
                onChange={(newDate: Date | null) => setDate(newDate)}
              />
            </div>
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Responsible</p>
              <InputForm
                type="text"
                placeholder="Responsible"
                className="w-full rounded-xl text-wrap hover:ring-violet-600"
              />
            </div>
          </div>
          <div className="flex space-x-5 px-4 mt-2">
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Justification</p>
              <TextArea
                id={`${number}.Jus`}
                placeholder="Justification"
                className="w-full rounded-xl text-wrap hover:ring-violet-600"
              />
            </div>
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Preview</p>
              <TextArea
                id={`${number}.Prev`}
                placeholder="Preview"
                className="w-full rounded-xl text-wrap hover:ring-violet-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
