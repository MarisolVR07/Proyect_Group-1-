import React, { useState } from "react";

interface CheckBoxProps {
  onChange: (checked: boolean) => void;
  checked?: boolean;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  checked,
  className,
}) => {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div
      className={`border-2 bg-white items-center justify-center cursor-pointer ${className}`}
      onClick={handleToggle}
    >
      {checked && <span className="text-violet-700">X</span>}
    </div>
  );
};

export default CheckBox;
