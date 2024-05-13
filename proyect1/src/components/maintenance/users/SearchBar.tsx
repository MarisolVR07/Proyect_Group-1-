import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
  
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 300); 
    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full p-2 rounded-md no-print"
    />
  );
};

export default SearchBar;
