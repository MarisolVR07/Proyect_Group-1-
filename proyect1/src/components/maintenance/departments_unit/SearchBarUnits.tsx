import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBarUnit: React.FC<SearchBarProps> = ({ onSearch }) => {
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
      placeholder="Search the unit by name..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="w-full p-2 rounded-md no-print"
    />
  );
};

export default SearchBarUnit;