import React, { useState } from "react";
import RespCheckBox from "./RespCheckBox";
import TableTextArea from "./TableTextArea";
import BoxButton from "./BoxButton";

interface TableRowProps {
  id: string;
  onDataChange: (data: TableRowData) => void;
  initialData: TableRowData;
  onFormVisibilityChange: (visible: boolean) => void;
}

interface TableRowData {
  question: string;
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
}

const TableRow: React.FC<TableRowProps> = ({
  id,
  initialData,
  onDataChange,
  onFormVisibilityChange,
}) => {
  const [rowData, setRowData] = useState<TableRowData>(initialData);

  const handleCheckBoxChange = (index: number) => {
    setRowData((prevData) => ({
      ...prevData,
      checkedIndex: index === prevData.checkedIndex ? null : index,
    }));
    onDataChange(rowData);
  };

  const handleTextAreaChange = (value: string, textareaIndex: number) => {
    setRowData((prevData) => ({
      ...prevData,
      [`textArea${textareaIndex + 1}`]: value,
    }));
    onDataChange(rowData);
  };

  const handleBoxButtonClick = () => {
    onFormVisibilityChange(true);
  };

  return (
    <div className="flex w-full border-t-2 border-gray-600">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-14">{id}</h3>
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
          id={`Ref.${id}`}
          className="w-28 h-full"
          value={rowData.textArea1}
          onChange={(value) => handleTextAreaChange(value, 0)}
        />
      </div>
      <div className="w-80 border-e-2 border-gray-600">
        <TableTextArea
          id={`Obs.${id}`}
          className="w-80 h-full"
          value={rowData.textArea2}
          onChange={(value) => handleTextAreaChange(value, 1)}
        />
      </div>
      {rowData.checkedIndex === 1 && (
        <div className="w-full">
          <BoxButton className="h-full w-full" onClick={handleBoxButtonClick}>
            <h1>Add</h1>
          </BoxButton>
        </div>
      )}
    </div>
  );
};

export default TableRow;
