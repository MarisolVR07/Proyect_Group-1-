import React, { useState } from "react";
import RespCheckBox from "./RespCheckBox";
import TableTextArea from "./TableTextArea";

interface TableRowProps {
  number: string;
}

const TableRow: React.FC<TableRowProps> = ({ number }) => {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(null);

  const handleCheckBoxChange = (index: number) => {
    if (index === checkedIndex) {
      setCheckedIndex(null);
    } else {
      setCheckedIndex(index);
    }
  };

  return (
    <div className="flex w-full border-t-2 border-gray-600">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-14">{number}</h3>
      </div>

      <div className="border-e-2 border-gray-600 text-left text-sm px-1 w-96">
        <h3 className="w-96">Question</h3>
      </div>

      <div className="flex border-e-2 border-gray-600">
        <div className="w-12 ">
          <RespCheckBox
            onChange={() => handleCheckBoxChange(0)}
            checked={checkedIndex === 0}
          />
        </div>
        <div className="border-s-2 border-gray-600 w-12">
          <RespCheckBox
            onChange={() => handleCheckBoxChange(1)}
            checked={checkedIndex === 1}
          />
        </div>
      </div>

      <div className="border-e-2 border-gray-600">
        <TableTextArea id="" className="w-28 h-full" />
      </div>

      <div className="w-full">
        <TableTextArea id="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default TableRow;
