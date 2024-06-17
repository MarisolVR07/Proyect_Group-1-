"use client";
import React, { useEffect, useState } from "react";
import { useParametersContextStore } from "@/store/authStore";
import { Parameter } from "@/app/types/entities";

const Footer: React.FC = () => {
  const { currentParameters } = useParametersContextStore();
   const [parameters, setParameters] = useState<Parameter | null>(null);

    useEffect(() => {
      setParameters(currentParameters);
    }, [currentParameters]);
  
  return (
    <footer className="text-white bg-black bg-opacity-30 body-font mt-auto bottom-0">
      <div className="container sm:px-5 sm:py-3 py-1 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="sm:w-10 sm:h-10 w-8 h-8 text-white p-2 bg-indigo-600 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="sm:ml-3 ml-1 sm:text-xl text-lg">ISC</span>
        </a>
        <p className="sm:text-base text-xs text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2024 {parameters?.PRM_Institution} — {parameters?.PRM_Email}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
