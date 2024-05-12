import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "./providers/SessionProvider";
import "./globals.css";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";

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
        <DebugModeToggle>
          <SessionProvider>{children}</SessionProvider>
        </DebugModeToggle>
      </body>
    </html>
  );
}