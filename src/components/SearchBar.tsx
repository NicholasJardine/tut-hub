import React, {useState} from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    return(
        <div className='flex justify-between search-container w-full'>
            <input className='w-[85%]'
            type="text"
            placeholder='Search'
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
             />
             <button className='btn btn-primary ml-2'>Search</button>
             {/* <p>Search Query: {query}</p> */}
        </div>
    );
};

export default SearchBar;