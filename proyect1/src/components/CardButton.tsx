import React from 'react';
import Link from 'next/link';

interface CardButtonProps {
    href: string;
    icon: any;
    title: string;
    description: string;
}

const CardComponent: React.FC<CardButtonProps> = ({ href, icon, title, description }) => (
    <Link href={href} passHref>
        <div className="p-4 w-80 cursor-pointer border-2 border-white px-4 py-6 rounded-lg">
                {icon}
                <h2 className="title-font font-medium text-3xl text-white">{title}</h2>
                <p className="leading-relaxed text-white">{description}</p>
        </div>
    </Link>
);

export default CardComponent;
