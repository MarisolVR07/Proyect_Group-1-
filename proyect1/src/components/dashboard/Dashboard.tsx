"use client";
import React, { useState } from "react";
import CardsSectionDashBoard from "./CardsSectionDashboard";
import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="items-center justify-center font-poppins drop-shadow-xl">
      <CardsSectionDashBoard />
    </div>
  );
};

export default Dashboard;
