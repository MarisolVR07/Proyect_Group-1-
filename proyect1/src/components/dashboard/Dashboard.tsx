"use client";
import React, { useState } from "react";
import CardsSectionDashBoard from "./CardsSectionDashboard";
import { useAuthStore } from "@/store/authStore";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useEffect } from "react";




const Dashboard = () => {
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('auth_token');
        if (!token) {
        //  window.location.href = "/";
          return;
        }
    
        try {
          jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
        } catch (error) {
          console.error('JWT verification failed:', error);
        //  window.location.href = "/";
        }
      }, []);
    
  console.log(currentUser);

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
