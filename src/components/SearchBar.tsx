import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

type SearchBarProps = {
    onSearch: (query: string) => void;  // Add onSearch prop to pass query to parent
};

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);  // Pass the query to the parent component
      };

    return(
        <div className='flex justify-between search-container w-full'>
            <div className="relative w-[85%]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input className='pl-10 w-full border border-gray-300 rounded-md py-2'
            type="text"
            placeholder= 'Search'
            value={query}
            onChange={handleInputChange}
             />
            </div>

             <button className='btn btn-primary ml-2'>Search</button>
             {/* <p>Search Query: {query}</p> */}
        </div>
    );
};

export default SearchBar;