"use client";
import Login from "@/components/login/Login";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/app/msalConfig";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center min-h-screen">
      <MsalProvider instance={msalInstance}>
        <Login />
      </MsalProvider>
    </main>
  );
}
