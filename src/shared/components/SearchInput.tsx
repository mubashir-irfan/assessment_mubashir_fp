'use client';

import { useState } from 'react';


interface SearchInputProps {
  onSearch: (query: string) => void;
  label?: string;
  placeholder?: string;
}

const SearchInput = ({ onSearch, label = 'Search', placeholder = 'Enter value...' }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-col rounded-md shadow-sm">
      <label htmlFor="search-input" className="sr-only">
        {label}
      </label>

      <div className='flex'>
        <input
          type="search"
          name="search"
          id="search-input"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="block w-full rounded-l-lg border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-600 dark:placeholder:text-gray-500"
        />

        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-800 dark:hover:bg-blue-900"
        >
          Search
        </button>

      </div>
    </div>
  );
};

export default SearchInput;