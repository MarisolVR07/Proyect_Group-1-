import React from 'react';

interface RolDropdownProps {
  selectedRol: string;
  onChange: (newRol: string) => void;
}

const RolDropdown: React.FC<RolDropdownProps> = ({ onChange, selectedRol }) => {
  
    const roles = ["admin", "user"];

    return (
      <select
        className="text-xs lg:text-base bg-gray-800 rounded-lg px-1"
        value={selectedRol}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">None</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    );
};

export default RolDropdown;
