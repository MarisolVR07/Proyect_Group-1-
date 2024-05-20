import React, { useEffect, useState } from 'react';
import { useDepartmentsStore } from "@/store/departmentStore";


interface DepartmentDropdownProps {
  selectedDepartment: number | null | undefined	  ; 
  onChange: (newDepartmentId: number) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ onChange, selectedDepartment }) => {
  const { departments, getDepartments } = useDepartmentsStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!departments.length) {
      setIsLoading(true);
      getDepartments().catch(console.error).finally(() => setIsLoading(false));
    }
  }, [departments.length, getDepartments]);

  return (
    <select value={Number(selectedDepartment)} onChange={e => onChange(parseInt(e.target.value, 10) || 0)}>
      <option value="">None</option>
      {departments.map(dept => (
        dept.DPT_Id != null && <option key={dept.DPT_Id} value={dept.DPT_Id}>{dept.DPT_Name}</option>
      ))}
    </select>
  );
};

export default DepartmentDropdown;

