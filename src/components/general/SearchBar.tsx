import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void; 
  
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');


  const debouncedSearch = useCallback(
    debounce((query: string) => { 
      onSearch(query);
    }, 300),
    [onSearch] 
  );

  useEffect(() => {

    if (inputValue) {
      debouncedSearch(inputValue);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  return (
    <input
      type="text"
      placeholder="Search users..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full bg-gray-800 p-2 border rounded-md no-print"
    />
  );
};

export default SearchBar;

