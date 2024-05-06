import React from "react";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";
import TableRow from "./TableRow";

interface TableProps {
  number: string;
}

const Table: React.FC<TableProps> = ({ number }) => {
  const renderTableRows = () => {
    const tableRows = [];
    for (let i = 1; i <= 4; i++) {
      tableRows.push(
        <TableRow key={`${number}.${i}`} number={`${number}.${i}`} />
      );
    }
    return tableRows;
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
