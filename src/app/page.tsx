"use client";
import Login from "@/components/login/Login";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/app/msalConfig";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import toast, { Toaster } from "react-hot-toast";
import { DebugMessage } from "./types/debugData";
import { useState } from "react";

export default function Home() {
  const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
  const handleDebugMessage = (message: DebugMessage) => {
    setDebugMessages((prevMessages) => [...prevMessages, message]);
  };
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <DebugModeToggle debugMessages={debugMessages}>
          <Toaster position="top-right" />
          <Login onDebugMessage={handleDebugMessage} />
        </DebugModeToggle>
      </MsalProvider>
    </>
  );
}
