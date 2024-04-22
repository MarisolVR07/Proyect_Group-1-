import React from 'react';

interface ButtonProps {
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
}


const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
 
  const buttonClasses = `text-white bg-violet-800 hover:bg-violet-700 rounded-md h-8 w-44 ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
