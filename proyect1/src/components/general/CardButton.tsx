import React from "react";
import Link from "next/link";

interface CardButtonProps {
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const CardComponent: React.FC<CardButtonProps> = ({
  href,
  onClick,
  icon,
  title,
  description,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border-2 border-white px-4 py-6 rounded-lg hover:border-violet-700 hover:text-violet-400 ${className}`}
    >
      {icon}
      <h2 className="title-font font-medium text-4xl sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="leading-relaxed text-sm sm:text-base md:text-white">
        {description}
      </p>
    </div>
  );
};

export default CardComponent;
