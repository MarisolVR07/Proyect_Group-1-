import React, { useState } from "react";

interface BoxButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const BoxButton: React.FC<BoxButtonProps> = ({
  children,
  onClick,
  className,
  icon,
}) => {
  return (
    <div
      className={`bg-transparent hover:ring-1 ring-white text-center items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
      {icon && <span className="mr-1 w-full h-full">{icon}</span>}
    </div>
  );
};

export default BoxButton;
