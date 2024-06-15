"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/general/PrimaryButton";
import InputFormsD from "../../maintenance/departments_unit/InputFormsD";
import Spinner from "@/components/skeletons/Spinner";
import SearchBarDU from "./SearchBarDU";
import { useDepartmentsStore } from "@/store/departmentStore";
import { Department } from "@/app/types/entities";
import { useUnitContextStore } from "@/store/authStore";
import toast from "react-hot-toast";

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    departments,
    saveDepartment,
    updateDepartment,
    getDepartmentsByName,
    getDepartmentsPerPage,
  } = useDepartmentsStore();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUnit } = useUnitContextStore();
  const [isEditing, setIsEditing] = useState(false);
  const [department, setDepartment] = useState<Department>({
    DPT_Name: "",
    DPT_Status: "",
    DPT_Unit: currentUnit?.UND_Id,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [isSearching, setIsSearching] = useState(false);

  const fetchDepartments = async (page: number) => {
    setIsLoading(true);
    try {
      if (isSearching) {
        await getDepartmentsByName(searchQuery, page );
      } else {
        await getDepartmentsPerPage(page);
      }
    } catch (error) {
      console.error("Failed to fetch units", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDepartments(currentPage+1);
  }, [currentPage,isSearching, searchQuery]);

  const handleSaveClickDepartment = async () => {
    console.log("Current unit:", currentUnit);
    if (currentUnit !== null && currentUnit.UND_Id) {
      setDepartment((i) => ({
        DPT_Unit: currentUnit.UND_Id,
        ...i,
      }));
      console.log("Department before save/update:", department);
      try {
        if (isEditing) {
          await updateDepartment(department);
          toast.success("Department updated successfully");
          setIsEditing(false);
        } else {
          await saveDepartment({
            ...department,
            DPT_Unit: currentUnit.UND_Id,
          });
          toast.success("Department saved successfully");
        }
        await fetchDepartments(currentPage);
      } catch (error) {
        toast.error("Failed to save department");
        console.error("Failed to save department", error);
      }
    } else {
      toast.error("Department not saved, unit id not specified");
      console.log("Department not saved, unit id not specified");
    }
  };

  const handleSearchChangeDepartment = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    setCurrentPage(0);
    setIsSearching(!!query);
    setIsLoading(true);
    try {
      if(query){
        await getDepartmentsByName(query,1)
      }else{
        await getDepartmentsPerPage(1)
      }
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
    const temporalDepartment: Department = {
      DPT_Name: selectedDepartment.DPT_Name,
      DPT_Status: selectedDepartment.DPT_Status,
      DPT_Id: selectedDepartment.DPT_Id,
      DPT_Unit: selectedDepartment.DPT_Unit,
    };
    setDepartment(temporalDepartment);
    setIsEditing(true);
  };

  const handleNextPage = () => {
    if(departments.length === 10){
    setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
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
          {isEditing ? "Update" : "Add"}
        </Button>
      </div>
      <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center mb-3"></div>
      <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center mb-5">
        <SearchBarDU onSearch={handleSearchChangeDepartment} />
      </div>
      <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center mb-5"></div>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
      ) : (
        <div className="overflow-x-auto mt-1 rounded-md">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(department)}
                  className="cursor-pointer"
                >
                  <td className="px-4 py-2">{department.DPT_Name}</td>
                  <td className="px-4 py-2">
                    {department.DPT_Status === "a" ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2">{department.rc_unit?.UND_Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-2">
            <Button
              className="rounded-xl w-44"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              className="rounded-xl w-44"
              onClick={handleNextPage}
              disabled={departments.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
