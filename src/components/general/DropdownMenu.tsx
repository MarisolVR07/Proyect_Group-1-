import React from "react";
import Link from "next/link";

interface LinkItem {
  href: string;
  text: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  links: LinkItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, links }) => {
  if (!isOpen) return null;

  return (
    <ul className="absolute text-center w-40 bg-white text-violet-700 py-2 rounded-md mt-1">
      {links.map((link, index) => (
        <Link href={link.href} key={index} passHref>
          <li className="hover:bg-violet-700 hover:text-white  px-3 py-2">
            {link.text}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default DropdownMenu;
