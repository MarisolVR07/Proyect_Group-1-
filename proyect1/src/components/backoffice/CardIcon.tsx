import React from 'react';

interface CardIconProps {
    children: React.ReactNode;
}

const CardIcon = ({ children }: CardIconProps) => (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
        {children}
    </svg>
);

export default CardIcon;
