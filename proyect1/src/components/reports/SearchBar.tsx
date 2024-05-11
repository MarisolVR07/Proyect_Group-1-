import React from 'react';
interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search self-assessment..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-2 rounded-md"
        />
    );
};

export default SearchBar;