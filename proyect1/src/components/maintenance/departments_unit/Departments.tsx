"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/general/PrimaryButton";
import InputForms from "../../forms/InputForms";
import Spinner from "@/components/skeletons/Spinner";
import SearchBarDU from "./SearchBarDU";
import { useDepartmentsStore } from "@/store/departmentStore";
import { Department, Unit } from "@/app/types/entities";

const Departments = ({ unit }: { unit: Unit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { departments, getDepartments, saveDepartment, getDepartmentsByName } = useDepartmentsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState<Department>({
    DPT_Name: "",
    DPT_Status: "",
    DPT_Unit: unit.UND_Id,
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
    console.log(unit);
    if (unit.UND_Id) {
      setDepartment((i) => ({
        DPT_Unit: unit.UND_Id,
        ...i,
      }));
      console.log(department);
      const savedDepartment = await saveDepartment({
        ...department,
        DPT_Unit: unit.UND_Id,
      });
      console.log(savedDepartment);
      console.log(department);
    } else {
      console.log("Department not saved");
    }
    //console.log("Department saved successfully");
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

  return (
    <div className="form-control flex-1 max-w-xl p-5 rounded-md bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl text-center">
      <h2 className="text-2xl text-white mb-3">DEPARTMENTS</h2>
      <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
        <h2 className="text-white text-base">NAME</h2>
      </div>
      <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
        <InputForms
          type="text"
          className="w-full rounded-md"
          placeholder="Department Name"
          onChange={handleChangeDName}
        />
      </div>
      <div className="bg-gray-700 w-full px-3 py-3 mb-3 flex items-center justify-between rounded-b-btn">
        <div className="items-center justify-start space-x-1">
          <input
            type="checkbox"
            id="stateCheckbox"
            name="stateCheckbox"
            className="ml-2"
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
                <tr key={index}>
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