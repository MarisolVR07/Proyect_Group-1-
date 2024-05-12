import React from "react";

interface TextAreaProps {
  id: string;
  className?: string;
  spam?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  className,
  spam,
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
    <div className="flex mb-1">
      {spam && (
        <label className="label me-1">
          <span className="label-text text-base text-white">{spam}</span>
        </label>
      )}
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`px-3 py-2 bg-gray-800 text-white ring-1 ring-white focus:outline-none focus:ring-2 focus:ring-violet-600 focus:rounded-sm ${className}`}
      ></textarea>
    </div>
  );
};

export default TextArea;
