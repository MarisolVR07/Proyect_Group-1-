import React from 'react';

type InputType = 'text' | 'password' | 'email';
interface InputFieldProps {
  label: string;
  type: InputType;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder }) => {
  return (
    <div className="w-full mb-6">
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input bg-white text-gray-700 input-bordered w-full h-8"
      />
    </div>
  );
};

export default InputField;
