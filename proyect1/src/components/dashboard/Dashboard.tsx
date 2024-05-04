"use client"
import React, { useState } from "react";
import CardsSectionDashBoard from "../backoffice/CardsSectionDashboard";
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
      <CardsSectionDashBoard />
      <div className="flex space-x-3 mt-3 mx-9 text-center justify-center">
      

      </div>
    </div>
  );
};

export default BackOffice;
