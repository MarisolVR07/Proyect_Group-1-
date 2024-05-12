"use client";
import Button from "@/components/general/PrimaryButton";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useUserStore } from "@/store/userStore";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { users, getUsers, currentUser } = useUserStore();

  const handleSaveClick = () => console.log("Save");
  const handlePrintClick = () => {
    window.print();
  };

  useEffect(() => {
    console.log(currentUser?.USR_FullName);
  }, [currentUser]);

  useEffect(() => {
    getUsers();
  }, [searchQuery, getUsers]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Button
          onClick={handlePrintClick}
          className="md:w-auto md:px-10 md:mt-0 rounded-xl ml-auto no-print"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
        </Button>
      </div>
      <h4 className="text-2xl text-white text-center mb-4 print-only text-color">
        USERS
      </h4>
      <SearchBar onSearch={handleSearchChange} />
      <div className="overflow-x-auto mt-4 rounded-md print-only">
        <table className="table-auto w-full text-color">
          <thead className="bg-violet-800 text-white">
            <tr>
              <th className="px-4 py-2 text-color">ID</th>
              <th className="px-4 py-2 text-color">FullName</th>
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
          className="md:w-auto md:px-10 mt-4 md:mt-0 rounded-xl no-print"
        >
          Send
        </Button>
      </div>

      <div className="m-5">
      <h5 className="text-sm text-white text-center mb-4 print-only text-color">
        {currentUser?.USR_FullName}
      </h5>
      </div>

    </div>
  );
};

export default Users;