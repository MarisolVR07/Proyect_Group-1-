import React from "react";

type InputType = "text" | "password" | "email";
interface InputFieldProps {
  label?: string;
  type: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="w-full lg:mb-6">
      {label && (
        <label className="label">
          <span className="label-text text-white">{label}</span>
        </label>
      )}
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="input bg-white text-gray-700 input-bordered w-full h-8"
      />
    </div>
  );
};

export default InputField;
