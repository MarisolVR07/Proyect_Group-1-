"use client"
import Reviews from "@/components/reviews/Reviews";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import { DebugMessage } from "@/app/types/debugData";

export default function Page() {
    const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
    const handleDebugMessage = (message: DebugMessage) => {
      setDebugMessages((prevMessages) => [...prevMessages, message]);
    };
  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header />
        <Reviews onDebugMessage={handleDebugMessage} />
        <Toaster position="top-right" />
        <Footer />
      </DebugModeToggle>
    </>
  );
}
