"use client";

import Button from "@/components/general/PrimaryButton";
import Label from "../../general/Label";
import TextArea from "../../forms/TextAreaForms";
import React, { useState } from "react";
import InputForms from "../../forms/InputForms";

import SecondaryButton from "../../general/SecondaryButton";
import SearchBar from "./SearchBar";

const handleSaveClick = () => console.log("Save");
const handleDeleteClick = () => console.log("Delete");

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h4 className="text-2xl text-white text-center mb-4">SEARCH USERS</h4>
      <SearchBar onSearch={handleSearchChange} />
      <div className="overflow-x-auto mt-4 rounded-md">
        <table className="table-auto w-full">
          <thead className="bg-violet-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">First Last Name</th>
              <th className="px-4 py-2">Second Last Name</th>
              <th className="px-4 py-2">State</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Action </th>
            </tr>
          </thead>
          <tbody>{/* Dynamic content will be loaded here */}</tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
        <div>
          <p>Carried out by:</p>
          <p>Reviewed by:</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <Button onClick={handleSaveClick} className="md:w-auto md:px-10 mt-4 md:mt-0 rounded-xl">Send</Button>
      </div>
    </div>
  );
};

export default Users;
