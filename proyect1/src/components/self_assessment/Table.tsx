import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";
import TableRow from "./TableRow";
import TableTextArea from "./TableTextArea";
import DateTimePicker from "../general/DateTimePicker";
import InputField from "../general/InputField";
import Select from "../general/Select";
import SecondaryButton from "../general/SecondaryButton";
import ProposedAction from "./ProposedAction";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
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
  const [rowData, setRowData] = useState<TableRowData[]>([
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
    },
    {
      question: "",
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleFormVisibility = (visible: boolean, index: number) => {
    setShowForm(visible);
    setSelectedRowIndex(index);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleRowDataChange = (index: number, newData: TableRowData) => {
    const updatedRowData = [...rowData];
    updatedRowData[index] = newData;
    setRowData(updatedRowData);
    onDataChange(updatedRowData);
  };

  const renderTableRows = () => {
    return rowData.map((data, index) => (
      <TableRow
        onFormVisibilityChange={(visible) => handleFormVisibility(visible, index)}
        key={`${id}.${index + 1}`}
        id={`${id}.${index + 1}`}
        initialData={data}
        onDataChange={(newData) => handleRowDataChange(index, newData)}
      />
    ));
  };

  return (
    <div className="form-control my-3 py-4 px-7 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="border-2 border-gray-600 w-full">
        <TableHeader />
        <TableSection number={id} />
        {renderTableRows()}
      </div>
      {showForm && selectedRowIndex !== null && (
        <ProposedAction onAccept={handleCloseForm} id={`${id}.${selectedRowIndex + 1}`} />
      )}
    </div>
  );
};

export default Table;
