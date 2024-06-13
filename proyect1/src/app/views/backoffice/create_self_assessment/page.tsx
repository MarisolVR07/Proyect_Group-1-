"use client"
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Header from "@/components/header/Header";
import MantSelfAssessment from "@/components/maintenance/self_assessment/MantSelfAssessment";
import { DebugMessage } from "@/app/types/debugData";

import { Toaster } from 'react-hot-toast';

export default function Page() {
  
    const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
    const handleDebugMessage = (message: DebugMessage) => {
      setDebugMessages((prevMessages) => [...prevMessages, message]);
    };
  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header />
        <Toaster position="top-right" />
        <MantSelfAssessment onDebugMessage={handleDebugMessage} />
      </DebugModeToggle>
    </>
  );
}
