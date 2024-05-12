import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-white bg-black bg-opacity-30 body-font mt-auto">
      <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-600 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">ISC</span>
        </a>
        <p className="text-md text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2024 Institution —
          <a
            href="Email"
            className="text-gray-300 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
        </p>
        <div className="inline-flex space-x-20 text-sm text-gray-300 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <p>Phone: </p>
          <p>Address: </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
