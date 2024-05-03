'use client'
import React, { useEffect, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import DropdownMenu from './DropdownMenu';
import DownArrowIcon from './DownArrowIcon';
export default function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const dropdownLinks = [
        { href: '/backoffice', text: 'Main' },
        { href: '/backoffice/Institution', text: 'Institution' },
        { href: '/backoffice/create-self-assessment', text: 'Self-Assessment' },
        { href: '/backoffice/users', text: 'Users' }
    ];

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
                            <PrimaryButton icon={<DownArrowIcon />} className='rounded-md w-40' onClick={toggleDropdown}>BackOffice</PrimaryButton>
                            <DropdownMenu isOpen={isDropdownOpen} links={dropdownLinks} />
                        </li>
                        <PrimaryButton className="rounded-md w-36">Reports</PrimaryButton>
                    </ul>
                </nav>
            </div>
        </header>
    );
}