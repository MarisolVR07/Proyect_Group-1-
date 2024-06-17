"use client"
import PageUD from "@/components/maintenance/departments_unit/PageUD";
import Header from "@/components/header/NewHeader";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";

export default function Page() {

   const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
   const handleDebugMessage = (message: DebugMessage) => {
     setDebugMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header currentPage="/views/backoffice/unit" />
        <Toaster position="top-right" />
        <PageUD onDebugMessage={handleDebugMessage} />
      </DebugModeToggle>
    </>
  );
}
