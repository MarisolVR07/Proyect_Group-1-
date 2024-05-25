"use client"
import PageUD from "@/components/maintenance/departments_unit/PageUD";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
export default function Page() {
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
  }, [token, router]);
  return (
    <>
      <DebugModeToggle>
        <Header/>
        <Toaster position="top-right"/>
        <PageUD/>
      </DebugModeToggle>
    </>
  );
}
