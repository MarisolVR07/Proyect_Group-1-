import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  // Using useCallback to memoize the debounced function
  const debouncedSearch = useCallback(
    debounce((query: string) => { // Adding type to `query`
      onSearch(query);
    }, 300),
    [onSearch] // Ensuring `onSearch` is a stable function
  );

  useEffect(() => {
    // Only call debouncedSearch if inputValue is not empty
    if (inputValue) {
      debouncedSearch(inputValue);
    }

    // Cleanup function to cancel the debounce on component unmount or inputValue change
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]); // Correct dependencies

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

