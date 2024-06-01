import React, { useState, useRef, useEffect } from 'react';
import { useDepartmentsStore } from "@/store/departmentStore";  
import { useOutsideClick } from "@/components/general/OutClick";

const DropdownMenu = ({ onSearch }) => {
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
            <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                {selected || "Select Department"}
            </button>
            {isOpen && (
                <ul className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md z-10">
                    {departments.map((department) => (
                        <li
                            key={department.DPT_Id}  
                            onClick={() => handleSelect(department)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {department.DPT_Name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;

