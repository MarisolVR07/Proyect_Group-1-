import React from "react";

interface TableTextAreaProps {
  id: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TableTextArea: React.FC<TableTextAreaProps> = ({
  id,
  className,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <textarea
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`px-1 bg-transparent text-sm ${className}`}
    ></textarea>
  );
};

export default TableTextArea;
