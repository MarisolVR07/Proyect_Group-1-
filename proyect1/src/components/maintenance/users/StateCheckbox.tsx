import React from 'react';

interface StateCheckboxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Typing the onChange handler
}

const StateCheckbox: React.FC<StateCheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <input type="checkbox" checked={isChecked} onChange={onChange} />
  );
};

export default StateCheckbox;
