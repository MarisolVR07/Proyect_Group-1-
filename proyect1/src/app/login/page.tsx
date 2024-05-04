"use client"
import Login from "@/components/login/Login";
import { MsalProvider } from "@azure/msal-react"; // Importa MsalProvider
import { msalInstance } from "@/app/msalConfig";

export default function Page() {
    
    return (
        
        <main className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
               <MsalProvider instance={msalInstance}> 
                <Login />
                </MsalProvider>
        </main>
    );
}