"use client";
import React, { useState } from "react";
import CardsSectionDashBoard from "./CardsSectionDashboard";
import { useAuthStore } from "@/store/authStore";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { currentUser } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
  );
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (token) {
      const decoded = verifyToken(token);
      setDecodedToken(decoded);
    } else {
      router.push("/");
    }
  }, [token]);

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
