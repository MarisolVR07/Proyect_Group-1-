import React from "react";
interface AlertSuccesProps {
  title?: string;
  message?: string;
}

const AlertSuccess: React.FC<AlertSuccesProps> = ({ title, message }) => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-40 w-full h-full"></div>
      <div
        role="alert"
        className="mb-2 fixed top-[10%] left-[50%] transform -trangray-x-1/2 -trangray-y-1/2 z-50 w-full max-w-md max-h-full"
      >
        <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
          {title}
        </div>
        <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default AlertSuccess;
