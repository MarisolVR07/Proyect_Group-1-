"use client";
import { ReactNode, useEffect, useState } from "react";
import DebugInfo from "./DebugInfo";

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

  if (debugMode) {
    return <DebugInfo />;
  }

  return <>{children}</>;
};

export default DebugModeToggle;
