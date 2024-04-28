
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MsalProvider } from "@azure/msal-react"; // Importa MsalProvider
import { msalInstance } from "../components/msalConfig"; // Importa tu configuración de MSAL
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCI",
  description: "Sistema de Control Interno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  
  );
}
