import React, { useEffect, useState } from 'react';
import { useDepartmentsStore } from "@/store/departmentStore";
import { useUserStore } from "@/store/userStore";

interface Department {
  DPT_Id?: number | null;  
  DPT_Name: string;
}
import { User } from "@/app/types/entities";

interface DepartmentDropdownProps {
  selectedDepartment: number | null; 
  onChange: (newDepartmentId: number) => void;
  userId?: number;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ userId, onChange }) => {
  const { departments, getDepartments } = useDepartmentsStore();
  const { users } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!departments.length) {
      setIsLoading(true);
      getDepartments().catch(console.error).finally(() => setIsLoading(false));
    }
  }, [departments.length, getDepartments]);

  // Filter departments to include only those with valid IDs
  const validDepartments = departments.filter(dept => dept.DPT_Id != null);
  const user = users.find(user => user.USR_Id === userId);
  const userDepartmentId = user?.USR_Department ? (typeof user.USR_Department === 'number' ? user.USR_Department : user.USR_Department.DPT_Id) : '';

  return (
    <select value={userDepartmentId || ''} onChange={e => onChange(parseInt(e.target.value, 10) || 0)}>
      <option value="">None</option>
      {departments.map(dept => (
        dept.DPT_Id != null && <option key={dept.DPT_Id} value={dept.DPT_Id}>{dept.DPT_Name}</option>
      ))}
    </select>
  );
};

export default DepartmentDropdown;

