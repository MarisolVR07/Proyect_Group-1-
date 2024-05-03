import React from 'react';
import Link from 'next/link';

interface CardButtonProps {
    href: string;
    icon: any;
    title: string;
    description: string;
    className?: string;
}

const CardComponent: React.FC<CardButtonProps> = ({ href, icon, title, description, className }) => (
    <Link href={href} passHref>
        <div className={`cursor-pointer border-2 border-white px-4 py-6 rounded-lg hover:border-violet-700 hover:text-violet-400 ${className}`}>
                {icon}
            <h2 className="title-font font-medium text-4xl">{title}</h2>
                <p className="leading-relaxed text-white">{description}</p>
        </div>
    </Link>
);

export default CardComponent;
