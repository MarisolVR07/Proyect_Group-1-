import React, { useEffect, useRef } from "react";

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
    adjustHeight();
  };

  const adjustHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      id={id}
      name={id}
      ref={textAreaRef}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={`px-1 bg-transparent text-sm ${className}`}
    ></textarea>
  );
};

export default TableTextArea;
