import React from "react";
import BoxButton from "./BoxButtonReview";

interface TableRowProps {
  id: string;
  question: string;
  answer: string;
  reference: string;
  observation: string;
  onFormVisibilityChange: (visible: boolean) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  id,
  answer,
  reference,
  observation,
  onFormVisibilityChange,
  question,
}) => {
  const handleBoxButtonClick = () => {
    onFormVisibilityChange(true);
  };

  return (
    <div className="flex w-full border-t-2 border-gray-600">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-10">{id}</h3>
      </div>
      <div className="border-e-2 border-gray-600 text-left text-sm px-1 w-full">
        <h3 className="w-full">{question}</h3>
      </div>
      <div className="flex border-e-2 border-gray-600 w-28 items-center justify-center">
        <p>{answer}</p>
      </div>
      <div className="border-e-2 border-gray-600 w-40">
        {reference !== "" && <a href={reference}>Go to document</a>}
      </div>
      <div className="w-96 border-e-2 border-gray-600">
        <p>{observation}</p>
      </div>
      <div className="w-36">
        {answer === "No" && (
          <BoxButton className="h-full w-full" onClick={handleBoxButtonClick}>
            <h1 className="w-full">View</h1>
          </BoxButton>
        )}
      </div>
    </div>
  );
};

export default TableRow;
