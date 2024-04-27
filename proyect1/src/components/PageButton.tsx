import React from "react";

interface PageButtonProps {
    pageNumber: number;
    currentPage: number;
    handlePageChange: (pageNumber: number) => void;
    className?: string;
}

const PageButton: React.FC<PageButtonProps> = ({ pageNumber, currentPage, handlePageChange, className }) => {

    const colors = ["bg-red-700", "bg-purple-600", "bg-green-600", "bg-blue-600", "bg-yellow-500"];


    const buttonColor = colors[pageNumber - 1];

    return (
        <button
            onClick={() => handlePageChange(pageNumber)}
            className={`text-sm  rounded-xl w-16 h-6 ${buttonColor} ${pageNumber === currentPage ? "text-white border-2" : "text-gray-800"}`}
        >
            {pageNumber}
        </button>
    );
};

export default PageButton;