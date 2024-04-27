import React from 'react';

interface SecondaryButtomProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}


const SecondaryButtom: React.FC<SecondaryButtomProps> = ({ children, onClick, className }) => {

    const buttonClasses = `bg-white text-sm text-violet-700 ring-2 ring-violet-700 w-20 h-6 hover:bg-violet-700 hover:text-white hover:ring-white ${className}`;

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default SecondaryButtom;