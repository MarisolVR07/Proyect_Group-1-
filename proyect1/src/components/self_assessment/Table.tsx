import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";
import TableRow from "./TableRow";

interface TableRowData {
  question: string;
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
}

interface TableProps {
  number: string;
  onDataChange: (data: TableRowData[]) => void;
}

const Table: React.FC<TableProps> = ({ number, onDataChange }) => {
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

  const handleRowDataChange = (index: number, newData: TableRowData) => {
    const updatedRowData = [...rowData];
    updatedRowData[index] = newData;
    setRowData(updatedRowData);
    onDataChange(updatedRowData);
  };

  const renderTableRows = () => {
    return rowData.map((data, index) => (
      <TableRow
        key={`${number}.${index + 1}`}
        number={`${number}.${index + 1}`}
        initialData={data}
        onDataChange={(newData) => handleRowDataChange(index, newData)}
      />
    ));
  };

  return (
    <div className="form-control my-3 py-4 px-7 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="border-2 border-gray-600 w-full">
        <TableHeader />
        <TableSection number={number} />
        {renderTableRows()}
      </div>
    </div>
  );
};

export default Table;
