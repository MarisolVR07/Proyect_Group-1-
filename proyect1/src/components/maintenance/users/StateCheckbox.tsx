import React from 'react';

interface StateCheckboxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;  // Typing the onChange handler
}

const StateCheckbox: React.FC<StateCheckboxProps> = ({ isChecked, onChange }) => {
  console.log(`Renderizando StateCheckbox, isChecked: ${isChecked}`);
  return (
    <input type="checkbox" checked={isChecked} onChange={onChange} />
  );
};

export default StateCheckbox;
