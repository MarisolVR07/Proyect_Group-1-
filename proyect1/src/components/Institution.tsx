"use client";
import Header from "@/components/Header";
import Button from "@/components/PrimaryButton";
import React from "react";
import Label from "./Label";
import TextArea from "./TextAreaForms";

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
const handleAddClick = () => {
  console.log("Add");
};
const handleDeleteClick = () => {
  console.log("Add");
};

export default function Page() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-violet-950 to-black pt-24">
      <Header />
      <div
        className="absolute top-20 mx-auto my-8 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-2xl w-1/2 p-6 flex flex-col items-center"
        style={{ minHeight: "32rem" }}
      >
        <h1 className="text-white text-3xl font-bold text-center mb-7">
          Institution
        </h1>
        <form className="flex flex-col">
          <FormRow label="Name" id="name" />
          <FormRow label="Email" id="email" />
          <FormRow label="Telephone" id="phone" />
          <FormRow label="Address" id="address" type="textarea" />
          <Button onClick={handleSaveClick} className="mb-2 w-full">
            Save
          </Button>
          <h1 className="text-white text-3xl font-bold text-center mb-16 mt-16">
            Department
          </h1>
          <FormRow label="Name" id="name" />
          <FormRow label="State" id="state" type="checkbox" />
        </form>
        <div className="flex w-full space-x-2">
          <Button onClick={handleAddClick} className="flex-1">
            Add
          </Button>
          <Button onClick={handleDeleteClick} className="flex-1">
            Delete
          </Button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-violet-800 text-white">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
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
