'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import PrimaryButton from './PrimaryButton';
export default function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <header className="w-full bg-transparent text-white py-3 top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="items-center">
                    <div className="text-4xl font-bold">ISC</div>
                    <div className="text-xs">Internal System Control</div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <PrimaryButton className="rounded-md w-36">DashBoard</PrimaryButton>
                        <li className="px-3 rounded-md">
                            <PrimaryButton className='rounded-md w-40' onClick={toggleDropdown}>BackOffice</PrimaryButton>
                            {isDropdownOpen && (
                                <ul className="absolute text-center bg-white text-violet-700 py-2 rounded-md mt-1 ms-1">
                                    <Link href="/backoffice/Institution/" passHref>
                                        <li className="hover:bg-violet-700 hover:text-white  px-3 py-2">Institution</li>
                                    </Link>
                                    <Link href="/backoffice/create-self-assessment" passHref>
                                        <li className="hover:bg-violet-700 hover:text-white  px-3 py-2">Self-Assessment</li>
                                    </Link>
                                    <Link href="/backoffice/users" passHref>
                                        <li className="hover:bg-violet-700 hover:text-white  px-3 py-2">Users</li>
                                    </Link>
                                </ul>
                            )}
                        </li>
                        <PrimaryButton className="rounded-md w-36">Reports</PrimaryButton>
                    </ul>
                </nav>
            </div>
        </header>
    );
}