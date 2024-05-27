"use client"
import Reports from "@/components/reports/Reports";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
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
        <Header />
        <Reports />
        <Toaster position="top-right"/>
        <Footer />
      </DebugModeToggle>
    </>
  );
}
