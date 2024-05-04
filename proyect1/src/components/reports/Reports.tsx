"use client";
import React, { useState } from "react";
import InputForms from "../forms/InputForms";
import TextArea from "../forms/TextAreaForms";
import Button from "../general/PrimaryButton";
import PageButton from "../general/PageButton";
import SecondaryButtom from "../general/SecondaryButton";
import PrimaryButton from "../general/PrimaryButton";
import DownArrowIcon from "../svg/DownArrowIcon";
import DropdownMenu from "../general/DropdownMenu";
import DateTimePicker from "../general/DateTimePicker";
import CardsSectionReports from "../reports/CardsSectionReports"
const Reports: React.FC = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const dropdownLinks = [
        { href: '', text: 'D1' },
        { href: '', text: 'D2' },
        { href: '', text: 'D3' }
    ];
    const handleDeleteClick = () => {
        console.log("Add");
      };
      

    return (
        <div className="form-control my-3 py-8 px-16 w-auto rounded-md items-center justify-center bg-gray-800 font-poppins font-semibold drop-shadow-xl">
            <h1 className="text-2xl text-white mb-5">REPORTS</h1>
            <div className="mb-5 px-3 rounded-md">
                <PrimaryButton icon={<DownArrowIcon />} className='rounded-md w-40' onClick={toggleDropdown}>Department</PrimaryButton>
                <DropdownMenu isOpen={isDropdownOpen} links={dropdownLinks} />
            </div>
            <div className="w-full mb-4 text-center">
                <div className="bg-gray-700 w-full   px-3 py-1 text-center mb-1">
                
                    <h2 className="text-white text-base">Select a card</h2>
                
                </div>
            
                <div className="bg-gray-700 w-full px-3 pb-3 mb-1">
                <CardsSectionReports />
                </div>
                <div className="bg-gray-700 w-full px-3 pb-3 mb-1"></div>
            </div>
            <div className="flex space-x-40">
                <Button className="rounded-xl w-44 mt-4">Export</Button>
            </div>

        </div>
    );
};

export default Reports;
