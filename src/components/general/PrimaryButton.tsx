import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  className,
  icon,
  disabled
}) => {
  const buttonClasses = `text-white bg-violet-800 hover:bg-violet-700 flex items-center justify-center ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
      {icon && <span className="mr-1">{icon}</span>}
      {disabled}
    </button>
  );
};

export default PrimaryButton;