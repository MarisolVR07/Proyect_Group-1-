import React, { useState } from "react";
import { AnswerData } from "@/app/types/selfAssessmentData";


interface QuestionProps {
  number: string;
  question: string;
  initialData: AnswerData;
}

const Question: React.FC<QuestionProps> = ({
  number,
  question,
  initialData,
}) => {

  return (
    <div className={`bg-gray-800 w-full px-2 py-2 rounded-xl text-sm`}>
      <p className="text-white text-start">{`${number} - ${question}`}</p>
      <div className="flex space-x-7 items-center justify-center text-white mt-2 ">
        <div className="items-center justify-center border p-1 rounded-xl text-xs">
          <p>Yes</p>
          <div className="w-5 h-5 border">
            {initialData.answer == 1 && <p>X</p>}
          </div>
        </div>
        <div className="items-center justify-center border p-1 rounded-xl text-xs">
          <p>No</p>
          <div className="w-5 h-5 border">
            {initialData.answer == 0 && <p>X</p>}
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-1 text-center">
        {initialData.observations !== "" && (
          <div>
            <p className="text-white text-xs lg:text-sm ">Observations</p>
            <div>
              <p className="border rounded-lg text-start px-1">
                {initialData.observations}
              </p>
            </div>
          </div>
        )}
        {initialData.url !== "" && (
          <div>
            <p className="text-white text-xs lg:text-sm">Work Papers URL</p>
            <div>
              <a
                href={initialData.url}
                target="_blank"
                className="hover:text-sm hover:text-white border rounded-lg text-start px-1"
              >
                Document
              </a>
            </div>
          </div>
        )}
      </div>
      {initialData.answer === 0 && (
        <div className="bg-gray-700 mt-3 rounded-xl py-2">
          <p className="text-white text-base">Proposed Action</p>
          <div className="flex space-x-2 px-4">
            {initialData.date !== null && (
              <div>
                <p className="text-white text-xs lg:text-sm">Date</p>
                <div>
                  <p className="border rounded-lg text-start px-1">
                    {initialData.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            {initialData.responsible !== "" && (
              <div className="w-full">
                <p className="text-white text-xs lg:text-sm">Responsible</p>
                <div>
                  <p className="border rounded-lg text-start px-1">
                    {initialData.responsible}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex space-x-2 px-4 mt-1">
             {initialData.justification !== "" && (
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Justification</p>
              <div>
                <p className="border rounded-lg text-start px-1">
                  {initialData.justification}
                </p>
              </div>
            </div>
            )}
            {initialData.preview !== "" && (
            <div className="w-full">
              <p className="text-white text-xs lg:text-sm">Preview</p>
              <div>
                <p className="border rounded-lg text-start px-1">
                  {initialData.preview}
                </p>
              </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
