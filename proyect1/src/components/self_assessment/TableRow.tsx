import React, { useState, useEffect } from "react";
import RespCheckBox from "./RespCheckBox";
import TableTextArea from "./TableTextArea";

interface TableRowProps {
  number: string;
  onDataChange: (data: TableRowData) => void;
  initialData: TableRowData;
}

interface TableRowData {
  question: string;
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
}

const TableRow: React.FC<TableRowProps> = ({
  number,
  initialData,
  onDataChange,
}) => {
  const [rowData, setRowData] = useState<TableRowData>(initialData);

  const handleCheckBoxChange = (index: number) => {
    setRowData((prevData) => ({
      ...prevData,
      checkedIndex: index === prevData.checkedIndex ? null : index,
    }));
  };

  const handleTextAreaChange = (value: string, textareaIndex: number) => {
    setRowData((prevData) => ({
      ...prevData,
      [`textArea${textareaIndex + 1}`]: value,
    }));
  };

  useEffect(() => {
    onDataChange(rowData);
  }, [rowData, onDataChange]);

  return (
    <div className="flex w-full border-t-2 border-gray-600">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-14">{number}</h3>
      </div>

      <div className="border-e-2 border-gray-600 text-left text-sm px-1 w-96">
        <h3 className="w-96">Question</h3>
      </div>

      <div className="flex border-e-2 border-gray-600">
        <div className="w-12">
          <RespCheckBox
            onChange={() => handleCheckBoxChange(0)}
            checked={rowData.checkedIndex === 0}
          />
        </div>
        <div className="border-s-2 border-gray-600 w-12">
          <RespCheckBox
            onChange={() => handleCheckBoxChange(1)}
            checked={rowData.checkedIndex === 1}
          />
        </div>
      </div>

      <div className="border-e-2 border-gray-600">
        <TableTextArea
          id=""
          className="w-28 h-full"
          value={rowData.textArea1}
          onChange={(value) => handleTextAreaChange(value, 0)}
        />
      </div>

      <div className="w-full">
        <TableTextArea
          id=""
          className="w-full h-full"
          value={rowData.textArea2}
          onChange={(value) => handleTextAreaChange(value, 1)}
        />
      </div>
    </div>
  );
};

export default TableRow;
