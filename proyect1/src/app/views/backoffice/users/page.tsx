"use client";
import Users from "@/components/maintenance/users/Users";
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
        <div className="items-center justify-center px-20 py-4">
          <Users onDebugMessage={handleDebugMessage} />
          <Toaster position="top-right"/>
        </div>
      </DebugModeToggle>
    </>
  );
}
