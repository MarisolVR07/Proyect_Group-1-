import React, { useState } from "react";

interface RespCheckBoxProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const RespCheckBox: React.FC<RespCheckBoxProps> = ({ onChange, checked }) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`border h-full border-gray-700 flex items-center justify-center cursor-pointer`}
      onClick={handleToggle}
    >
      {checked && <span className="text-white">X</span>}
    </div>
  );
};

export default RespCheckBox;