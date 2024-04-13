import React from "react";
interface AlertWarningProps {
  title?: string;
  message?: string;
}

const AlertWarning: React.FC<AlertWarningProps> = ({ title, message }) => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-40 w-full h-full"></div>
      <div
        role="alert"
        className="mb-2 fixed top-[10%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full"
      >
        <div className="bg-orange-500 text-white font-bold rounded-t px-4 py-2 ">
          {title}
        </div>
        <div className="border border-t-0 border-orange-400 rounded-b bg-orange-100 px-4 py-3 text-orange-700">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default AlertWarning;
