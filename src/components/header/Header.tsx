"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../general/PrimaryButton";
import DropdownMenu from "../general/DropdownMenu";
import DownArrowIcon from "../svg/DownArrowIcon";
import Link from "next/link";
import { useUserContextStore } from "@/store/authStore";

export default function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser } = useUserContextStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const dropdownLinks = [
    { href: "/views/backoffice", text: "Main" },
    { href: "/views/backoffice/unit", text: "Departments Unit" },
    {
      href: "/views/backoffice/create_self_assessment",
      text: "Self-Assessment",
    },
    { href: "/views/backoffice/users", text: "Users" },
  ];

  useEffect(() => {
    if(currentUser?.USR_Role === "admin"){
      setIsAdmin(true)
    }
  }, [currentUser]);

  return (
    <header className="w-full bg-transparent text-white sm:py-3 py-1 top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="items-center">
          <div className="sm:text-4xl text-3xl font-bold text-color print-only">
            ISC
          </div>
          <div className="text-xs text-color print-only ">
            Internal System Control
          </div>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <Link href="/views/dashboard" passHref>
              <PrimaryButton className="rounded-md w-36 no-print">
                DashBoard
              </PrimaryButton>
            </Link>
            <li className="px-3 rounded-md">
              {isAdmin ? (
                <PrimaryButton
                  icon={<DownArrowIcon />}
                  className="rounded-md w-40 no-print"
                  onClick={toggleDropdown}
                >
                  BackOffice
                </PrimaryButton>
              ) : (
                <></>
              )}
              <DropdownMenu isOpen={isDropdownOpen} links={dropdownLinks} />
            </li>
            <Link href="/views/self_assessment_review" passHref>
              <PrimaryButton className="rounded-md w-36 no-print">
                Reviews
              </PrimaryButton>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}