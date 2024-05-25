import React, { useEffect, useState } from "react";
import Button from "@/components/general/PrimaryButton";
import InputFormsU from "../../maintenance/departments_unit/InputFormsU";
import Spinner from "@/components/skeletons/Spinner";
import SearchBarDU from "./SearchBarDU";
import { useUnitStore } from "@/store/unitStore";
import { Unit } from "@/app/types/entities";
import { useUnitContextStore } from "@/store/authStore";
import toast from 'react-hot-toast';

const Units = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { units, getUnits, saveUnit, updateUnit, getUnitsByName } = useUnitStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [unit, setUnit] = useState<Unit>({
    UND_Name: "",
    UND_Email: "",
    UND_Status: "",
  });
  const { setCurrentUnit } = useUnitContextStore();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getUnits();
        toast.success("Units fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch units");
        console.error("Failed to fetch units", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSaveClickUnit = async () => {
    try {
      console.log("Unit before save/update:", unit);
      if (isEditing) {
        await updateUnit(unit);
        toast.success("Unit updated successfully");
        setIsEditing(false);
      } else {
        const savedUnit = await saveUnit(unit);
        setUnit(savedUnit as Unit);
        setCurrentUnit(savedUnit as Unit);
        toast.success("Unit saved successfully");
      }
      await getUnits();
    } catch (error) {
      toast.error("Failed to save or update unit");
      console.error("Failed to save or update unit", error);
    }
  };

  const handleSearchChangeUnit = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results = query.length > 0 ? await getUnitsByName(query) : await getUnits();
      toast.success("Search results fetched successfully");
      console.log("Search results fetched successfully", results);
    } catch (error) {
      toast.error("Error searching units");
      console.error("Error searching units", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeName = (e: string) => {
    setUnit((i) => ({ ...i, UND_Name: e }));
  };

  const handleChangeEmail = (e: string) => {
    setUnit((i) => ({ ...i, UND_Email: e }));
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit((i) => ({ ...i, UND_Status: e.target.checked ? "a" : "i" }));
  };

  const handleUnitClick = (clickedUnit: Unit) => {
    setUnit(clickedUnit);
    setIsEditing(true);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < units.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedUnits = units.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="form-control flex-1 max-w-xl p-5 rounded-md bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl text-center">
      <h1 className="text-2xl mb-3">DEPARTMENTS UNIT</h1>
      <div className="w-full mb-4 text-center">
        <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
          <h2 className="text-white text-base">NAME</h2>
        </div>
        <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
          <InputFormsU
            type="text"
            label=""
            placeholder="Unit Name"
            className="w-full rounded-md"
            value={unit.UND_Name}
            onChange={handleChangeName}
          />
        </div>
        <div className="bg-gray-700 w-full h-10 py-1 text-center">
          <h2 className="text-white text-base"> EMAIL</h2>
        </div>
        <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
          <InputFormsU
            type="email"
            label=""
            placeholder="Unit Email"
            className="w-full rounded-md"
            value={unit.UND_Email + ""}
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
              checked={unit.UND_Status === "a"}
              onChange={handleChangeStatus}
            />
            <label htmlFor="stateCheckbox" className="text-white">
              Status
            </label>
          </div>
          <Button onClick={handleSaveClickUnit} className="rounded-xl w-44">
            {isEditing ? "Update" : "Save"}
          </Button>
        </div>
        <div className="w-full px-3 py-3 bg-gray-700 rounded-md items-center justify-center">
          <SearchBarDU onSearch={handleSearchChangeUnit} />
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
                {paginatedUnits.map((unit, index) => (
                  <tr key={index} onClick={() => handleUnitClick(unit)} className="cursor-pointer">
                    <td className="px-4 py-2">{unit.UND_Name}</td>
                    <td className="px-4 py-2">
                      {unit.UND_Status === "a" ? "Active" : "Inactive"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-2">
            <Button className="rounded-xl w-44" onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</Button>
            <Button className="rounded-xl w-44" onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= units.length}>Next</Button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Units;