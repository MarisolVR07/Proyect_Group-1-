"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Alert from "@/components/alerts/Alert";
import { useUserContextStore } from "@/store/authStore";
import { DebugMessage } from "@/app/types/debugData";

interface DebugModeToggleProps {
  children: ReactNode;
  debugMessages?: DebugMessage[];
}

const DebugModeToggle = ({
  children,
  debugMessages = [],
}: DebugModeToggleProps) => {
  const [debugMode, setDebugMode] = useState(false);
  const { currentUser } = useUserContextStore();
  const alertsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const debugParam = params.get("debug");

    if (debugParam === "true") {
      setDebugMode(true);
    }
  }, []);

  useEffect(() => {
    if (alertsContainerRef.current) {
      alertsContainerRef.current.scrollTop =
        alertsContainerRef.current.scrollHeight;
    }
  }, [debugMessages]);

  const renderAlerts = () => {
    return debugMessages.map((message, index) => (
      <Alert key={index} type={message.type} message={message.content} />
    ));
  };

  return (
    <main className="w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-black via-100% via-violet-900 to-violet-800">
      {debugMode && (
        <>
          <div className="fixed z-50 top-1 w-full flex h-24 items-center rounded-3xl py-2 px-4 bg-gray-700 bg-opacity-90 space-x-1">
            <div className="text-xs text-white font-poppins font-bold space-y-1">
              <p>Email: {currentUser?.USR_Email}</p>
              <p>FullName: {currentUser?.USR_FullName}</p>
              <p>Role: {currentUser?.USR_Role}</p>
            </div>
            <div
              className="flex-grow h-full overflow-y-auto text-xs text-white font-poppins font-bold "
              ref={alertsContainerRef}
            >
              {renderAlerts()}
            </div>
          </div>
          <div className="mt-24">{children}</div>
        </>
      )}
      {!debugMode && <>{children}</>}
    </main>
  );
};

export default DebugModeToggle;
