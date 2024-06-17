import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBarDU: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedSearch = useCallback(
    debounce((query: string) => { 
      onSearch(query);
    }, 300),
    [onSearch] 
  );

  useEffect(() => {
    debouncedSearch(inputValue);
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full bg-gray-800 border p-2 rounded-md no-print"
    />
  );
};

export default SearchBarDU;