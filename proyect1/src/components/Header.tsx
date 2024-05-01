'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './PrimaryButton';
export default function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <header className="w-full bg-transparent text-white py-4 px-8 top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
              <div className="items-center">
                    <div className="text-4xl font-bold mr-4">SCI</div>
                    <div className="text-xs">Internal System Control</div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                    <SecondaryButton className="hover:bg-violet-700 px-3 py-2">DashBoard</SecondaryButton>
                        <li className="hover:bg-violet-700 px-3 py-2 rounded-md">
                            <PrimaryButton onClick={toggleDropdown}>BackOffice</PrimaryButton>
                            {isDropdownOpen && (
                                <ul className="absolute bg-white text-black py-2 rounded-md ">
                                     <Link href="/backoffice/Institution/" passHref>
                                    <li className="hover:bg-violet-700 px-3 py-2">Institution</li>
                                    </Link>
                                    <Link href="/backoffice/create-self-assessment" passHref>
                                    <li className="hover:bg-violet-700 px-3 py-2">Self-Assessment</li>
                                    </Link>
                                    <Link href="/backoffice/users" passHref>
                                    <li className="hover:bg-violet-700 px-3 py-2">Users</li>
                                    </Link>
                                </ul>
                            )}
                        </li>
                        <SecondaryButton className="hover:bg-violet-700 px-3 py-2 rounded-md">Reports</SecondaryButton>
                    </ul>
                </nav>
            </div>
        </header>
    );
}