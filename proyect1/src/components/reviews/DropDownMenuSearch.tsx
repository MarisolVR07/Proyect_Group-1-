import React, { useState, useRef, useEffect } from 'react';
import { useDepartmentsStore } from "@/store/departmentStore";  
import { useOutsideClick } from "@/components/general/OutClick";

const DropdownMenuDepartment = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const dropdownRef = useRef(null);
    const { departments, getDepartments } = useDepartmentsStore();  

    useEffect(() => {
        if (departments.length === 0) {
            getDepartments();  
        }
    }, [departments, getDepartments]);

    useOutsideClick(dropdownRef, () => {
        if (isOpen) setIsOpen(false);
    });

    const handleSelect = (department) => {
        setSelected(department.DPT_Name);  
        setIsOpen(false);
        onSearch(department.DPT_Id);  
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-violet-500 text-white rounded-md">
                {selected || "Select Department"}
            </button>
            {isOpen && (
                <ul className="absolute text-center w-40 bg-white text-violet-700 py-2 rounded-md mt-1 z-10 max-h-60 overflow-y-auto  overflow-x-hidden">
                    {departments.map((department) => (
                        <li
                            key={department.DPT_Id}  
                            onClick={() => handleSelect(department)}
                            className="px-3 py-2 hover:bg-violet-700 hover:text-white cursor-pointer"
                        >
                            {department.DPT_Name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenuDepartment;
