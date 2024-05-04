"use client"
import React, { useState } from "react";
import CardsSection from "./CardsSection";
import DateTimePicker from "../general/DateTimePicker";
import SearchBar from "../maintenance/users/SearchBar";
import Image from "next/image";
import InputField from "../general/InputField";
import PrimaryButton from "../general/PrimaryButton";

const BackOffice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoURL(url);
    }
  };

  return (
    <div className="items-center justify-center my-4 font-poppins drop-shadow-xl">
      <CardsSection />
      <div className="flex space-x-3 mt-3 mx-9 text-center justify-center">
        <div className="bg-gray-700 p-3 text-center items-center justify-center rounded-bl-xl">
          <h2 className="text-xl text-center text-white mb-3 font-semibold">APP ACTIVATION/DEACTIVATION DATE-TIME</h2>
          <div className="flex space-x-32 items-center justify-center">
            <DateTimePicker text="Select activation date and time" />
            <DateTimePicker text="Select deactivation date and time" />
          </div>
          <div className="mt-3">
            <h2 className="text-xl text-center text-white font-semibold">EMAIL</h2>
            <InputField type="email" label="" placeholder="Email" />
          </div>
          <div className="">
            <h2 className="text-xl text-center text-white mb-3 font-semibold">LOGO</h2>
            <input type="file" onChange={handleLogoChange} />
            {logoFile && (
              <div className="my-4 flex justify-center">
                <div className="w-48 h-48 flex items-center justify-center">
                  <Image src={URL.createObjectURL(logoFile)} alt="Logo" width={200} height={200} />
                </div>
              </div>
            )}
          </div>
          <PrimaryButton className="w-44 rounded-md mt-4 mx-auto">
            Save
          </PrimaryButton>
        </div>
        <div className="form-control flex-1 p-8 rounded-br-xl bg-gray-700 text-white">
          <div className=" w-full h-10 py-1 items-center justify-center text-center">
            <h2 className="text-xl text-white font-semibold">NEW USERS</h2>
          </div>

          <div className=" w-full px-3 pb-3 pt-4 mb-1 bg-gray-700 rounded-md items-center justify-center">
            <SearchBar onSearch={handleSearchChange} />
          </div>
          <div className="overflow-x-auto mt-4 rounded-md">
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
      </div>
    </div>
  );
};

export default BackOffice;
