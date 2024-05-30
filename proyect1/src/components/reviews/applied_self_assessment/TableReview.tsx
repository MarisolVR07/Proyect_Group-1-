import React, { useState } from "react";
import TableHeader from "./TableHeaderReview";
import TableSection from "./TableSectionReview";
import TableRow from "./TableRowReview";
import ProposedAction from "./ProposedActionReview";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: string;
}

interface TableRowData {
  answer: string;
  reference: string;
  observation: string;
  ProposedActionData: ProposedActionData;
}

interface TableProps {
  id: string;
  questions: string[];
  section: string | null | undefined;
  data: TableRowData[];
}

const Table: React.FC<TableProps> = ({ id, section, data, questions }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleFormVisibility = (visible: boolean, index: number) => {
    setShowForm(visible);
    setSelectedRowIndex(index);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const renderTableRows = () => {
    return data.map((rowData, index) => (
      <TableRow
        onFormVisibilityChange={(visible) =>
          handleFormVisibility(visible, index)
        }
        key={`${id}.${index + 1}`}
        id={`${id}.${index + 1}`}
        question={questions[index]}
        answer={rowData.answer}
        reference={rowData.reference}
        observation={rowData.observation}
      />
    ));
  };

  return (
    <div className="form-control my-1 p-2 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="border-2 border-gray-600 w-full">
        <TableHeader />
        <TableSection number={id} section={section} />
        {renderTableRows()}
      </div>
      {showForm && selectedRowIndex !== null && (
        <ProposedAction
          onAccept={handleCloseForm}
          id={`${id}.${selectedRowIndex + 1}`}
          responsible={data[selectedRowIndex].ProposedActionData.responsible}
          justification={
            data[selectedRowIndex].ProposedActionData.justification
          }
          preview={data[selectedRowIndex].ProposedActionData.preview}
          date={data[selectedRowIndex].ProposedActionData.date}
        />
      )}
    </div>
  );
};

export default Table;
