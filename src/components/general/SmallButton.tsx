import React from "react";

interface SmallButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const SmallButton: React.FC<SmallButtonProps> = ({ onClick, children }) => {
  const buttonClasses = `text-white bg-violet-800 hover:bg-violet-700 rounded-md h-8 w-8`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default SmallButton;
