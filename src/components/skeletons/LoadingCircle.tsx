import React from "react";

interface LoadingCircleProps {
  text: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-violet-700 mb-4"></div>
      <p className="text-white">{text}</p>
    </div>
  );
};

export default LoadingCircle;
