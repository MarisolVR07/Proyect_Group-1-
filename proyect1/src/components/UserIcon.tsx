import React from 'react';

const UserIcon: React.FC = () => {
  return (
    <div>
      <svg
        className="h-32 w-32 text-black bg-slate-100 rounded-full shadow-xl "
        fill="none"
        viewBox="0 0 24 26"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
  );
};

export default UserIcon;
