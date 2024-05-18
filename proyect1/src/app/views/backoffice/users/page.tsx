"use client";
import Users from "@/components/maintenance/users/Users";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import { useState } from "react";

interface DebugMessage {
  content: string;
  type: "Error" | "Info" | "Warning" | "Success";
}

export default function Page() {
  const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);

  const handleDebugMessage = (message: DebugMessage) => {
    setDebugMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header />
        <div className="items-center justify-center px-20 py-4">
          <Users onDebugMessage={handleDebugMessage} />
        </div>
      </DebugModeToggle>
    </>
  );
}
