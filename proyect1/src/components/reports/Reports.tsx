"use client";
import React, { useState } from "react";
import Button from "../general/PrimaryButton";
import SearchBar from "./SearchBar";
const Reports: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const dropdownLinks = [
    { href: "", text: "D1" },
    { href: "", text: "D2" },
    { href: "", text: "D3" },
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };
  return (
      <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h4 className="text-2xl text-white text-center mb-4"> REPORTS</h4>
      <SearchBar onSearch={handleSearchChange} />
       <div className="overflow-x-auto mt-4 rounded-md">
        <table className="table-auto w-full">
          <thead className="bg-violet-800 text-white">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Reviewed by</th>
            </tr>
          </thead>

          <tbody>
              <tr>
                <td className="px-4 py-2">{}</td>
                <td className="px-4 py-2">{}</td>
              </tr>
      
          </tbody>
        </table>
      </div>
      <div className="flex space-x-40">
        <Button className="rounded-xl w-44 mt-4">Export</Button>
      </div>
    </div>
    
  );
};

export default Reports;
