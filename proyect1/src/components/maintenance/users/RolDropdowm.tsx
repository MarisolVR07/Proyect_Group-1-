import React, { useEffect, useState } from 'react';
import { useUserStore } from "@/store/userStore";

interface RolDropdownProps {
  selectedRol: string;
  onChange: (newRol: string) => void;
}

const RolDropdown: React.FC<RolDropdownProps> = ({ onChange, selectedRol }) => {
  
    const roles = ["admin", "user", "ti"];

    return (
        <select value={selectedRol} onChange={e => onChange(e.target.value)}>
            <option value="">none</option>  
            {roles.map(role => (
                <option key={role} value={role}>{role}</option>
            ))}
        </select>
    );
};

export default RolDropdown;
