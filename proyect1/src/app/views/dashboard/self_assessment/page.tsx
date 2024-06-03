"use client"
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Header from "@/components/header/Header";
import SelfAssessment from "@/components/self_assessment/SelfAssessment";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";


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
    const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
    const handleDebugMessage = (message: DebugMessage) => {
      setDebugMessages((prevMessages) => [...prevMessages, message]);
    };
  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header />
        <SelfAssessment />
      </DebugModeToggle>
    </>
  );
}
