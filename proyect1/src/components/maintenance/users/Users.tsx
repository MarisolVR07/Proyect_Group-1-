"use client";
import Button from "@/components/general/PrimaryButton";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useUserStore } from "@/store/userStore";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, getUsers } = useUserStore();

  const handleSaveClick = () => console.log("Save");

  useEffect(() => {
    getUsers();
  }, [searchQuery, getUsers]);

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
              <th className="px-4 py-2">FullName</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{user.USR_Email}</td>
                <td className="px-4 py-2">{user.USR_FullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
        <Button
          onClick={handleSaveClick}
          className="md:w-auto md:px-10 mt-4 md:mt-0 rounded-xl"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Users;