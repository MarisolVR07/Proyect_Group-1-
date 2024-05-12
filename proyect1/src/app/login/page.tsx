"use client";
import Login from "@/components/login/Login";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/app/msalConfig";

export default function Page() {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <Login />
      </MsalProvider>
    </>
  );
}
