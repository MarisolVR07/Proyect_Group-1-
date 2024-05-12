"use client";
import React, { useState } from "react";
import CardsSectionDashBoard from "./CardsSectionDashboard";

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
    </div>
  );
};

export default BackOffice;
