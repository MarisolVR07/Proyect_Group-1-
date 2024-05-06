import React from "react";

interface TableSectionProps {
  number: string;
}

const TableSection: React.FC<TableSectionProps> = ({ number }) => {
  return (
    <div className="flex w-full">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-14">{number}</h3>
      </div>

      <h3 className="w-96">Section</h3>
    </div>
  );
};

export default TableSection;
