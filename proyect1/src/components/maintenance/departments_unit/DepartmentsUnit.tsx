"use client";

import Button from "@/components/general/PrimaryButton";
import Label from "../../general/Label";
import TextArea from "../../forms/TextAreaForms";
import InputForms from "../../forms/InputForms";
import SecondaryButtom from "../../general/SecondaryButton";
import React, { useEffect, useState } from "react";
import InputField from "@/components/general/InputField";
import { useUnitStore } from "@/store/unitStore";
import { useDepartmentsStore } from "@/store/departmentStore";
import { Department, Unit } from "@/app/types/entities";
import { ChangeEvent } from "react";
import SearchBarUnit from "./SearchBarUnits";
import SearchBarDepartment from "./SearchBarDepartments";
import Spinner from "@/components/skeletons/Spinner";
interface FormRowProps {
  label: string;
  id: string;
  type?: "text" | "checkbox" | "textarea";
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => onSearch(e.target.value)}
      className="w-full p-2 rounded-md"
    />
  );
};

const FormRow: React.FC<FormRowProps> = ({ label, id, type = "text" }) => {
  return (
    <div
      className={`flex w-full mb-4 items-center ${
        type === "checkbox" ? "justify-start" : "justify-between"
      }`}
    >
      <Label htmlFor={id} className="w-1/3">
        {label}
      </Label>
      {type === "textarea" ? (
        <TextArea id={id} className="w-2/3" />
      ) : type === "checkbox" ? (
        <input type="checkbox" id={id} name={id} className="ml-4" />
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          className="w-2/3 h-10 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </div>
  );
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const {departments, getDepartments, getDepartment, saveDepartment, updateDepartment, getDepartmentsByName} = useDepartmentsStore();
  const { units, getUnits, getUnit, saveUnit, updateUnit, getUnitsByName } = useUnitStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading2(true);
      try {
        await getDepartments();
        
      } catch (error) {
        console.error("Failed to fetch departments", error);
       
      }
      setIsLoading2(false);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getUnits();
        
      } catch (error) {
        console.error("Failed to fetch units", error);
       
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);


  const [unit, setUnit] = useState<Unit>({
    UND_Name: " ",
    UND_Email: " ",
    UND_Status: " ",
  });

  const [department, setDepartment] = useState<Department>({
    DPT_Name: " ",
    DPT_Status: " ",
    DPT_Unit: unit.UND_Id,
  });

  const [unitName, setUnitName] = useState<string>("");
  const [unitEmail, setUnitEmail] = useState<string>("");
  const [unitStatus, setUnitStatus] = useState<string>("");
  const [deparmentName, setDepartmentName] = useState<string>("");
  const [deparmentStatus, setDepartmentStatus] = useState<string>("");

  const handleSaveClickUnit = async () => {
    try {
      console.log(unit);
      const savedUnit = await saveUnit(unit);
      console.log(savedUnit);
      setUnit(savedUnit as Unit);
      console.log(unit);
    } catch (error) {
      console.log(error);
    }
    console. log("Unit saved succesfull");
  };

  const handleSaveClickDeparment = async () => {
    if (unit.UND_Id) {
      setDepartment((i) => ({
        DPT_Unit: unit.UND_Id,
        ...i,
      }));
      console.log(department);
      const savedDepartment = await saveDepartment({... department, DPT_Unit: unit.UND_Id,
         });
      console.log(savedDepartment);
      console.log(department);
    } else {
      console.log("Unit not saved");
    }
    console. log("Department saved succesfull");
  };

  const handleDeleteClick = () => {
    console.log("Deleted");
  };


  const handleSearchChangeUnit = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results =
        query.length > 0 ? await getUnitsByName(query) : await getUnits();
    } catch (error) {
      console.error("Error searching users", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearchChangeDepartment =  async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading2(true);
    try {
      const results =
        query.length > 0 ? await getDepartmentsByName(query) : await getDepartments();
    } catch (error) {
      console.error("Error searching users", error);
    } finally {
      setIsLoading2(false);
    }
  };

  
  const handleChangeName = (e: string) => {
    setUnit((i) => ({ ...i, UND_Name: e }));
  };
  const handleChangeEmail = (e: string) => {
    setUnit((i) => ({ ...i, UND_Email: e }));
  };
  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit((i) => ({ ...i, UND_Status: e.target.checked? "a" : "i" }));
  };
  const handleChangeDName = (e: string) => {
    setDepartment((i) => ({ ...i, DPT_Name: e }));
  };
  const handleChangeDStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment((i) => ({ ...i, DPT_Status: e.target.checked? "a" : "i" }));
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center my-4 text-white font-poppins font-semibold drop-shadow-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-7 max-w-7xl space-y-4 md:space-y-0">
        <div className="form-control flex-1 max-w-xl p-5 rounded-md bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl text-center">
          <h1 className="text-2xl mb-3">DEPARTMENTS UNIT</h1>
          <div className="w-full mb-4 text-center">
            <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
              <h2 className="text-white text-base">NAME</h2>
            </div>
            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <InputForms
                type="text"
                label=""
                placeholder="Unit Name"
                className="w-full rounded-md"
                onChange={handleChangeName}
              />
            </div>
            <div className="bg-gray-700 w-full h-10 py-1 text-center">
              <h2 className="text-white text-base"> EMAIL</h2>
            </div>
            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <InputForms
                type="email"
                label=""
                placeholder="Unit Email"
                className="w-full rounded-md"
                onChange={handleChangeEmail}
              />
            </div>
            <div className="bg-gray-700 w-full px-3 py-3 mb-3 flex items-center justify-between rounded-b-btn">
              <div className="items-center justify-start space-x-1">
                <input
                  type="checkbox"
                  id="stateCheckbox"
                  name="stateCheckbox"
                  className="ml-2"
                  onChange = {handleChangeStatus}
                />
                <label htmlFor="stateCheckbox" className="text-white">
                  Status
                </label>
              </div>
              <Button onClick={handleSaveClickUnit} className="rounded-xl w-44">
                Save
              </Button>
            </div>
            <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center">
              <SearchBarUnit
                onSearch={handleSearchChangeUnit}
              />
            </div>
            {isLoading ? (<Spinner />) : (<div className="overflow-x-auto mt-1 rounded-md">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-violet-800 text-white">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((unit, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{unit.UND_Name}</td>
                      <td className="px-4 py-2">{unit.UND_Status === "a"?"Active":"Inactive"}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>)}

          </div>
        </div>
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
            <Button
              onClick={handleSaveClickDeparment}
              className="rounded-xl w-44"
            >
              Add
            </Button>
          </div>
          <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center">
            <SearchBarDepartment
              onSearch={handleSearchChangeDepartment}
            />
          </div>
          {isLoading2 ? (<Spinner />):(<div className="overflow-x-auto mt-1 rounded-md">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-violet-800 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((departments, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{departments.DPT_Name}</td>
                    <td className="px-4 py-2">{departments.DPT_Status === "a"?"Active":"Inactive"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
          
        </div>
      </div>
    </div>
  );
}