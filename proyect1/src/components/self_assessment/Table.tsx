import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";
import TableRow from "./TableRow";
import ProposedAction from "./ProposedAction";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
}

interface TableRowData {
  question: string;
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
  proposedActionData?: ProposedActionData;
}

interface TableProps {
  id: string;
  onDataChange: (data: TableRowData[]) => void;
}

const Table: React.FC<TableProps> = ({ id, onDataChange }) => {
  const initialRowData: TableRowData[] = [
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ];

  const [rowData, setRowData] = useState<TableRowData[]>(initialRowData);
  const [showForm, setShowForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleFormVisibility = (visible: boolean, index: number) => {
    setShowForm(visible);
    setSelectedRowIndex(index);
  };

  const handleCloseForm = (proposedActionData: ProposedActionData) => {
    setShowForm(false);
    if (selectedRowIndex !== null) {
      const updatedRowData = [...rowData];
      updatedRowData[selectedRowIndex].proposedActionData = proposedActionData;
      setRowData(updatedRowData);
      onDataChange(updatedRowData);
    }
  };

  const handleRowDataChange = (
    index: number,
    newData: TableRowData,
    proposedActionData: ProposedActionData | undefined
  ) => {
    const updatedRowData = [...rowData];
    updatedRowData[index] = {
      ...newData,
      proposedActionData: proposedActionData || {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    };
    setRowData(updatedRowData);
    onDataChange(updatedRowData);
  };

  const renderTableRows = () => {
    return rowData.map((data, index) => (
      <TableRow
        onFormVisibilityChange={(visible) =>
          handleFormVisibility(visible, index)
        }
        key={`${id}.${index + 1}`}
        id={`${id}.${index + 1}`}
        initialData={data}
        onDataChange={(newData) =>
          handleRowDataChange(index, newData, data.proposedActionData)
        }
      />
    ));
  };

  return (
    <div className="form-control my-1 p-2 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="border-2 border-gray-600 w-full">
        <TableHeader />
        <TableSection number={id} />
        {renderTableRows()}
      </div>
      {showForm && selectedRowIndex !== null && (
        <ProposedAction
          initialData={rowData[selectedRowIndex].proposedActionData}
          onAccept={handleCloseForm}
          id={`${id}.${selectedRowIndex + 1}`}
        />
      )}
    </div>
  );
};

export default Table;
