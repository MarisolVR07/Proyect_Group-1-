import React from "react";

type InputType = "text" | "password" | "email";
interface InputFormsProps {
  label?: string;
  type: InputType;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputFormsU: React.FC<InputFormsProps> = ({
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex">
      {label && (
        <label className="label me-4">
          <span className="label-text text-base text-white">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`px-3 text-white ring-1 ring-white bg-gray-800 w-full h-10 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:rounded-sm ${className}`}
      />
    </div>
  );
};

export default InputFormsU;