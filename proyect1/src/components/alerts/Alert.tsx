import React from "react";

interface AlertProps {
  type: "Error" | "Info" | "Warning" | "Success";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const getAlertStyle = () => {
    switch (type) {
      case "Error":
        return "border-red-500 text-red-500";
      case "Info":
        return "border-blue-500 text-blue-500";
      case "Warning":
        return "border-yellow-500 text-yellow-500";
      case "Success":
        return "border-green-500 text-green-500";
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div
      className={`flex items-center py-1 px-3 mb-1 mx-1 text-sm text-white border rounded-lg ${getAlertStyle()} bg-transparent`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">{type}</span>
      <div>
         {message}
      </div>
    </div>
  );
};

export default Alert;
