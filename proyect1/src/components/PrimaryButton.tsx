import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
}


const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick, className }) => {
 
  const buttonClasses = `text-white bg-violet-800 hover:bg-violet-700 h-8 w-44 ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
