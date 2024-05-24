"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/general/PrimaryButton";
import InputFormsD from "../../maintenance/departments_unit/InputFormsD";
import Spinner from "@/components/skeletons/Spinner";
import SearchBarDU from "./SearchBarDU";
import { useDepartmentsStore } from "@/store/departmentStore";
import { Department } from "@/app/types/entities";
import { useUnitContextStore } from "@/store/authStore";

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { departments, getDepartments, saveDepartment, getDepartmentsByName } = useDepartmentsStore();
  const [isLoading, setIsLoading] = useState(false);
  const {currentUnit} = useUnitContextStore();
  const [department, setDepartment] = useState<Department>({
    DPT_Name: "",
    DPT_Status: "",
    DPT_Unit: currentUnit?.UND_Id,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getDepartments();
      } catch (error) {
        console.error("Failed to fetch departments", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSaveClickDepartment = async () => {
    console.log(currentUnit);
    if (currentUnit !== null && currentUnit.UND_Id) {
      setDepartment((i) => ({
        DPT_Unit: currentUnit.UND_Id,
        ...i,
      }));
      console.log(department);
      const savedDepartment = await saveDepartment({
        ...department,
        DPT_Unit: currentUnit.UND_Id,
      });
      console.log(savedDepartment);
      console.log(department);
    } else {
      console.log("Department not saved, unit id not specified");
    }
    console.log("Department saved successfully");
  };

  const handleSearchChangeDepartment = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results =
        query.length > 0 ? await getDepartmentsByName(query) : await getDepartments();
    } catch (error) {
      console.error("Error searching departments", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDName = (e: string) => {
    setDepartment((i) => ({ ...i, DPT_Name: e }));
  };
  const handleChangeDStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment((i) => ({ ...i, DPT_Status: e.target.checked ? "a" : "i" }));
  };
  const handleRowClick = (selectedDepartment: Department) => {
    setDepartment(selectedDepartment);
  };

  return (
    <div className="form-control flex-1 max-w-xl p-5 rounded-md bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl text-center">
      <h2 className="text-2xl text-white mb-3">DEPARTMENTS</h2>
      <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
        <h2 className="text-white text-base">NAME</h2>
      </div>
      <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
        <InputFormsD
          type="text"
          className="w-full rounded-md"
          placeholder="Department Name"
          value={department.DPT_Name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeDName(e.target.value)}
        />
      </div>
      <div className="bg-gray-700 w-full px-3 py-3 mb-3 flex items-center justify-between rounded-b-btn">
        <div className="items-center justify-start space-x-1">
          <input
            type="checkbox"
            id="stateCheckbox"
            name="stateCheckbox"
            className="ml-2"
            checked={department.DPT_Status === "a"}
            onChange={handleChangeDStatus}
          />
          <label htmlFor="stateCheckbox" className="text-white">
            Status
          </label>
        </div>
        <Button onClick={handleSaveClickDepartment} className="rounded-xl w-44">
          Add
        </Button>
      </div>
      <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center">
        <SearchBarDU onSearch={handleSearchChangeDepartment} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto mt-1 rounded-md">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index} onClick={() => handleRowClick(department)} className="cursor-pointer">
                  <td className="px-4 py-2">{department.DPT_Name}</td>
                  <td className="px-4 py-2">
                    {department.DPT_Status === "a" ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Departments;