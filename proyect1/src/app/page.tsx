"use client";
import Login from "@/components/login/Login";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/app/msalConfig";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <DebugModeToggle>
          <Login />
        </DebugModeToggle>
      </MsalProvider>
    </>
  );
}
