"use client";

import Button from "@/components/general/PrimaryButton";
import Label from "../../general/Label";
import TextArea from "../../forms/TextAreaForms";
import InputForms from "../../forms/InputForms";
import SecondaryButtom from "../../general/SecondaryButton";
import React, { useState } from "react";
interface FormRowProps {
  label: string;
  id: string;
  type?: "text" | "checkbox" | "textarea";
}

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search departments..."
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

const handleSaveClick = () => {
  console.log("Save");
};
const handleAddClick = () => {
  console.log("Add");
};
const handleDeleteClick = () => {
  console.log("Add");
};

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-screen  text-white font-poppins font-semibold drop-shadow-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between my-4 p-4 max-w-7xl space-y-4 md:space-y-0">
        <div className="form-control flex-1 max-w-lg p-8 rounded-md items-center justify-center bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl">
          <h1 className="text-2xl mb-5">INSTITUTION</h1>

          <div className="w-full mb-4 text-center">
            <div className="bg-gray-700 w-full h-10 py-1 rounded text-center">
              <h2 className="text-white text-base">Name</h2>
            </div>

            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <TextArea id={"FirstLastName"} className={"w-full rounded-md"} />
            </div>
            <div className="bg-gray-700 w-full h-10 py-1 text-center">
              <h2 className="text-white text-base"> Email</h2>
            </div>
            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <TextArea id={"SecondLastName"} className={"w-full rounded-md"} />
            </div>
            <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
              <h2 className="text-white text-base">Telephone</h2>
            </div>
            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <InputForms type={"text"} className="w-full rounded-md" />
            </div>
            <div className="bg-gray-700 w-full h-10 py-1 text-center">
              <h2 className="text-white text-base"> Adress</h2>
            </div>
            <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
              <TextArea id={"SecondLastName"} className={"w-full rounded-md"} />
            </div>
            <div className="relative  w-full h-10 flex flex-col space-y-4 rounded-xl bg-gray-700 py-1 px-3 my-4 items-center justify-center">
              <div className="flex w-full space-x-3 rounded-xl  py-1 px-3 my-4 items-center justify-center">
                <SecondaryButtom
                  onClick={handleDeleteClick}
                  className="rounded-xl w-20"
                >
                  Clean
                </SecondaryButtom>
                <Button onClick={handleSaveClick} className="rounded-xl w-44">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="form-control flex-1 max-w-xl p-8 rounded-md bg-gray-800 text-white font-poppins font-semibold drop-shadow-xl">
          <div className=" w-full h-10 py-1 items-center justify-center text-center">
            <h2 className="text-2xl text-white mb-5 ">DEPARTMENTS</h2>
          </div>

          <div className="bg-gray-700 w-full h-10 py-1 text-center rounded-t-xl">
            <h2 className="text-white text-base">Name</h2>
          </div>
          <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
            <InputForms type={"text"} className="w-full rounded-md" />
          </div>
          <div className="bg-gray-700 w-full px-3 pb-3 flex items-center justify-start rounded-b-btn">
            <label htmlFor="stateCheckbox" className="text-white ml-36">
              State
            </label>
            <input
              type="checkbox"
              id="stateCheckbox"
              name="stateCheckbox"
              className="ml-2"
            />
          </div>
          <div className="flex w-full space-x-3 rounded-xl  py-1 px-3 my-4 items-center justify-center">
            <SecondaryButtom
              onClick={handleDeleteClick}
              className="rounded-xl w-20 "
            >
              Delete
            </SecondaryButtom>
            <Button onClick={handleSaveClick} className="rounded-xl w-44">
              Save
            </Button>
          </div>
          <div className=" w-full h-10 py-1 items-center justify-center text-center">
            <h2 className="text-2xl text-white mb-5 "> SEARCH DEPARTMENTS</h2>
          </div>

          <div className=" w-full px-3 pb-3 pt-4 mb-1 bg-gray-700 rounded-md items-center justify-center">
            <SearchBar onSearch={handleSearchChange} />
          </div>
          <div className="overflow-x-auto mt-4 rounded-md">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-violet-800 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">State</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
