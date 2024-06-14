"use client"
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Header from "@/components/header/NewHeader";
import SelfAssessment from "@/components/v2/SelfAssessment";
import { useState } from "react";
import { DebugMessage } from "@/app/types/debugData";
import { Toaster } from "react-hot-toast";




export default function Page() {

 
    const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
    const handleDebugMessage = (message: DebugMessage) => {
      setDebugMessages((prevMessages) => [...prevMessages, message]);
    };
  return (
    <>
      <DebugModeToggle debugMessages={debugMessages}>
        <Header currentPage="/views/dashboard/self_assessment" />
        <Toaster position="top-right" />
        <SelfAssessment onDebugMessage={handleDebugMessage} />
      </DebugModeToggle>
    </>
  );
}
