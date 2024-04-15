"use client";
import Header from "@/components/Header";
import Button from "@/components/Button";
import React, { useState } from "react";
import Link from 'next/link';


export default function Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEvaluationsClick = () => {
    console.log("Evaluatons");
  };

  const handleUsersClick = () => {
    console.log("Users");
  };

  const handleReportsClick = () => {
    console.log("Reports");
  };

  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-violet-950 to-black pt-24">
      <Header />
      <div
        className="absolute top-20 mx-auto my-8 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-2xl w-1/2 p-6 flex flex-col items-center"
        style={{ minHeight: "32rem" }}
      >
        <h1 className="text-white text-3xl font-bold text-center mb-7">
          BackOffice
        </h1>

        <div className="w-full flex flex-col items-center">
          <Link href="/institution/" passHref>
            <Button className="mb-2 w-full">
            Institution
            </Button>
          </Link>
          <Button onClick={toggleDropdown} className="mb-2 w-full">
            Departments
          </Button>
          <div className="relative w-full">
            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Department 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Department 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Department 3
                </a>
              </div>
            )}
          </div>
          <Link href="/backoffice/create-self-assessment" passHref>
            <Button className="mb-2 w-full">
              Self-Assessment
            </Button>
          </Link>
          <Link href="/users/" passHref>
            <Button className="mb-2 w-full">
              Users
            </Button>
          </Link>

          <Button
            onClick={() => console.log("Reports")}
            className="mb-2 w-full"
          >
            Reports
          </Button>
        </div>
      </div>
    </main>
  );
}
