"use client";
import { ReactNode, useEffect, useState } from "react";

interface DebugModeToggleProps {
  children: ReactNode;
}

const DebugModeToggle = ({ children }: DebugModeToggleProps) => {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const debugParam = params.get("debug");

    if (debugParam === "true") {
      setDebugMode(true);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-black via-100% via-violet-900 to-violet-800">
      {debugMode && (
        <div className="bg-red-500 text-white p-4">
          <h2>Debug Mode Activated</h2>
          <p>Some debug information goes here.</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default DebugModeToggle;
