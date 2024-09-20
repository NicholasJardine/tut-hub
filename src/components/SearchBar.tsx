import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faUniversity, faGraduationCap, faSchool, faChalkboardTeacher, faChartLine, faCalendarAlt, faGlobe, faLaptopHouse, faLock, faBookOpen, faUserGraduate, faCalendarCheck, faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    return(
        <div className='flex justify-between search-container w-full'>
            <div className="relative w-[85%]">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input className='pl-10 w-full border border-gray-300 rounded-md py-2'
            type="text"
            placeholder= 'Search'
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
             />
            </div>

             <button className='btn btn-primary ml-2'>Search</button>
             {/* <p>Search Query: {query}</p> */}
        </div>
    );
};

export default SearchBar;