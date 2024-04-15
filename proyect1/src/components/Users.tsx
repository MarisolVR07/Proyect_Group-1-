"use client";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Label from "./Label";
import TextArea from "./TextArea";
import React, { useState } from "react";

interface FormRowProps {
  label: string;
  id: string;
  type?: "text" | "checkbox" | "textarea";
}

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
const handleDeleteClick = () => {
  console.log("Delete");
};


export default function Page() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-violet-950 to-black pt-24">
        <Header />
        <div
            className="absolute top-20 mx-auto my-8 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-2xl w-1/2 p-6 flex flex-col items-center"
            style={{ minHeight: "32rem" }}
        >
            <h1 className="text-white text-3xl font-bold text-center mb-7">
                Users
            </h1>
            <form className="flex flex-col">
                <FormRow label="Name" id="name" />
                <FormRow label="Last Name" id="lastName1" />
                <FormRow label="Last Name" id="lastName2" />
                <FormRow label="State" id="state" type="checkbox" />
            </form>

            <div className="flex w-full space-x-2 mb-2">  {/* Reduce el espacio aquí */}
                <Button onClick={handleSaveClick} className="flex-1">
                    Save
                </Button>
                <Button onClick={handleDeleteClick} className="flex-1">
                    Delete
                </Button>
            </div>

            <Button onClick={toggleDropdown} className="mb-20 w-full">  
                Roles
            </Button>

            <div className="relative w-full">
                {isDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Administrator
                        </a>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            User
                        </a>
                    </div>
                )}
            </div>
            
            <div className="w-full overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-violet-800 text-white">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">First Last Name</th>
                            <th className="px-4 py-2">Second Last Name</th>
                            <th className="px-4 py-2">State</th>
                        </tr>
                    </thead>
                    <tbody>{/* Aquí se cargarán los datos dinámicamente */}</tbody>
                </table>
            </div>
        </div>
    </main>
);
}