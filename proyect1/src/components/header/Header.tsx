'use client'
import React, { useEffect, useState } from 'react';
import PrimaryButton from '../general/PrimaryButton';
import DropdownMenu from '../general/DropdownMenu';
import DownArrowIcon from '../svg/DownArrowIcon';
import Link from 'next/link';

export default function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const dropdownLinks = [
        { href: '/views/backoffice', text: 'Main' },
        { href: '/views/backoffice/Institution', text: 'Institution' },
        { href: '/views/backoffice/create_self_assessment', text: 'Self-Assessment' },
        { href: '/views/backoffice/users', text: 'Users' }
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
                    <Link href="/views/dashboard" passHref>
                            <PrimaryButton className="rounded-md w-36">DashBoard</PrimaryButton>
                        </Link>
                        <li className="px-3 rounded-md">
                            <PrimaryButton icon={<DownArrowIcon />} className='rounded-md w-40' onClick={toggleDropdown}>BackOffice</PrimaryButton>
                            <DropdownMenu isOpen={isDropdownOpen} links={dropdownLinks} />
                        </li>
                        <Link href="/views/reports" passHref>
                            <PrimaryButton className="rounded-md w-36">Reports</PrimaryButton>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
