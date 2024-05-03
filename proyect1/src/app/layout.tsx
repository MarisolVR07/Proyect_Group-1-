
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MsalProvider } from "@azure/msal-react"; // Importa MsalProvider
import { msalInstance } from "./msalConfig"; // Importa tu configuración de MSAL
import { SessionProvider } from "./providers/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ISC",
  description: "Internal System Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <SessionProvider
    >{children}
    </SessionProvider></body>
  </html>
  );
}
