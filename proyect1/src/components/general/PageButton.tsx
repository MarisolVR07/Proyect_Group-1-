import React from "react";

interface PageButtonProps {
  pageNumber: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  className?: string;
  hasUnansweredQuestions: boolean;
}

const PageButton: React.FC<PageButtonProps> = ({
  pageNumber,
  currentPage,
  handlePageChange,
  className,
  hasUnansweredQuestions,
}) => {
  return (
    <button
      onClick={() => handlePageChange(pageNumber)}
      className={`${className} sm:text-sm ${
        hasUnansweredQuestions ? "ring-1 ring-red-500" : ""
      }  text-xs rounded-xl sm:w-16 sm:h-6 w-10 h-5 hover:bg-violet-700 hover:border-2 ${
        pageNumber === currentPage
          ? "text-violet-600 border-2 border-violet-600 bg-white"
          : "bg-gray-700 text-white"
      }`}
    >
      {pageNumber}
    </button>
  );
};

export default PageButton;
