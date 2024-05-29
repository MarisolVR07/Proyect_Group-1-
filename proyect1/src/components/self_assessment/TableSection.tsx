import React from "react";

interface TableSectionProps {
  number: string;
  section: string | null | undefined;
}

const TableSection: React.FC<TableSectionProps> = ({ number, section }) => {
  return (
    <div className="flex w-full">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-10">{number}</h3>
      </div>

      <h3 className="w-96">{section}</h3>
    </div>
  );
};

export default TableSection;
