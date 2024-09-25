"use client";

import '@/components/PriceSlider';
import { useEffect, useState } from 'react';
import PriceSlider from '@/components/PriceSlider';
import PlatformSelector from '@/components/PlatformSelector';
import SearchBar from '@/components/SearchBar';
import TutorsGrid from '@/components/TutorsGrid';
import { NavTwo } from '@/sections/NavTwo';
import AvatarUpload from '@/sections/AvatarUpload';
import { Footer } from '@/sections/Footer';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faBookmark, faDollar, faForward } from '@fortawesome/free-solid-svg-icons';

type Tutor = {
  full_name: string;
  email: string;
  avatar_url: string | null;
  specialty: string;
  hourly_rate: number;
  years_of_experience: number;
  bio: string;
};

export default function Welcome() {
  const [userName, setUserName] = useState('');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [tutors, setTutors] = useState<Tutor[]>([]);   // Add state for all tutors
  const [searchQuery, setSearchQuery] = useState(''); 
  // Inside the Welcome component
  const [sortOrder, setSortOrder] = useState<string>(''); // For sorting (rate or experience)
  const [experienceRange, setExperienceRange] = useState<string>(''); // For experience range
  // const [hourlyRateRange, setHourlyRateRange] = useState<number[]>([75, 500]); 
  const [rate, setRate] = useState<number>(350); 
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const tutorsPerPage = 6; 
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(e.target.value);
  };
  
  // Handle experience range selection
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceRange(e.target.value);
    console.log("Experience range selected:", e.target.value);  // Log the selected range

  };

  useEffect(() => {
    console.log("Selected Experience Range:", experienceRange);  // Check if experience range changes
  }, [experienceRange]);
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch('/api/tutors', {
          method: 'GET',
          credentials: 'include',  // Ensure cookies are sent with the request
        });
        const data = await response.json();
        console.log("Response data:", data);  // Log the received data


        if (response.ok) {
          setUserName(data.full_name);  // Set the user's name from the response
        } else {
          console.error('Error fetching user info:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('/api/alltutors');  // Fetch all tutors
        const data = await response.json();
        if (response.ok) {
          console.log(data.tutors);  // Check if tutors are being fetched

          setTutors(data.tutors);  // Set all tutors
        } else {
          console.error('Error fetching tutors:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };

    fetchTutors();
  }, []);


  const filteredTutors = tutors.filter(tutor => 
    tutor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tutor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )  .filter(tutor => {
    // Apply experience range filter
    if (experienceRange === '0-1') return tutor.years_of_experience === 1;
    if (experienceRange === '1-3') return tutor.years_of_experience >= 1 && tutor.years_of_experience <= 3;
    if (experienceRange === '3-5') return tutor.years_of_experience >= 3 && tutor.years_of_experience <= 5;
    if (experienceRange === '5+') return tutor.years_of_experience >= 5;
    return true; // No filter if none selected
  })  .sort((a, b) => {
    // Sorting logic for hourly rate
    if (sortOrder === 'lowest-rate') {
      return a.hourly_rate - b.hourly_rate;  // Sort from lowest to highest
    }
    if (sortOrder === 'highest-rate') {
      return b.hourly_rate - a.hourly_rate;  // Sort from highest to lowest
    }    if (sortOrder === 'most-experience') {
      return b.years_of_experience - a.years_of_experience;  // Sort from highest to lowest
    }
    return 0; // No sorting if no sort order is selected
  }).filter(tutor => tutor.hourly_rate <= rate); ;;
  const indexOfLastTutor = currentPage * tutorsPerPage;
const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
const currentTutors = filteredTutors.slice(indexOfFirstTutor, indexOfLastTutor);
const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage); // Total number of pages
const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    console.log("Filtered Tutors:", filteredTutors);  // Ensure this logs filtered tutors
  }, [searchQuery, experienceRange, tutors]);  

  return (
    <>
    <NavTwo/>
    <div className='bg-[#4B0082] lg:mt-[-10px]'>
    <div className="container mx-auto max-w-[95%] p-4 pt-10">
      <div className='flex justify-between'>
        <div className="flex flex-col w-[25%] bg-[#D3D3FF] text-[#4B0082] px-4 py-2 rounded-lg max-h-[82.5vh]">
          <div className="flex justify-between items-center underline-divider">
            <h3>Filters</h3>
            <p>Reset All</p>
          </div>

          <div className="underline-divider">
          <div> <h4>Order by</h4></div>
          <div className="grid grid-cols-2 gap-2">
  <label className="flex items-center">
    <input onChange={handleSortChange} type="radio" name="sort" value="lowest-rate" className="mr-2"/>
    Lowest Rate
  </label>

  <label className="flex items-center">
    <input onChange={handleSortChange} type="radio" name="sort" value="highest-rate" className="mr-2 whitespace-nowrap"/>
    Highest Rate
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input onChange={handleSortChange} type="radio" name="sort" value="most-experience" className="mr-2"/>
    Most Experience
  </label>
</div>



          </div>
          <div className="underline-divider">
            <div><h4>Hourly Rate</h4></div>
            
            <div className='max-w-[95%]'> <PriceSlider onRateChange={setRate}/></div>
          </div>

          <div className="underline-divider">
            <div><h4>Experience (years)</h4></div>
            {/* <div className="radio-buttons-group">
              <label>
                <input type="radio" name="sort" value="lowest-rate"/>
                0-1
              </label>

              <label>
                <input type="radio" name="sort" value="highest-rate"/>
                1-2
              </label>

              <label>
                <input type="radio" name="sort" value="most-experience"/>
                2-3
              </label>

              <label>
                <input type="radio" name="sort" value="a-z"/>
                3-4
              </label>
          </div> */}


<div className="grid grid-cols-2 gap-2">
  <label className="flex items-center">
    <input onChange={handleExperienceChange} type="radio" name="sort" value="0-1" className="mr-2"/>
    0-1
  </label>

  <label className="flex items-center">
    <input onChange={handleExperienceChange} type="radio" name="sort" value="1-3" className="mr-2 whitespace-nowrap"/>
    1-3
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input onChange={handleExperienceChange} type="radio" name="sort" value="3-5" className="mr-2"/>
    3-5
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input onChange={handleExperienceChange} type="radio" name="sort" value="5+" className="mr-2"/>
    5+
  </label>
</div>

          </div>
          <div>
            <div><h4>Preferred platform</h4></div>
            <PlatformSelector/>
          </div>
          
        </div>

        <div className="flex flex-col w-[45%]">
          <SearchBar onSearch={setSearchQuery}/>
          <div className="flex justify-between items-center">
          <h3 className='text-white'>Search results</h3>
          <p className='text-white'>50 results found</p>
          </div>
          <TutorsGrid setSelectedTutor={setSelectedTutor} tutors={currentTutors}/>
          <div className="pagination-controls flex justify-center items-center mt-0 mb:-2">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="btn text-white ml-2 px-2 py-1 text-xs"
  >
    <FontAwesomeIcon icon={faBackward} className='text-white mr-2' />
    Prev
  </button>
  <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`btn mr-2 px-2 py-1 text-xs ${currentPage === index + 1 ? 'bg-[#FA8340] text-white' : 'bg-[#D3D3FF]'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={indexOfLastTutor >= filteredTutors.length}
    className="btn mr-2 px-2 py-1 text-xs text-white gap-2"
  >
    Next
    <FontAwesomeIcon icon={faForward} className='text-white' />

  </button>
</div>
        </div>

        <div className="flex flex-col w-[25%] bg-[#D3D3FF] text-[#4B0082] rounded-lg max-h-[82.5vh]">
        {selectedTutor ? (
    <div className="p-4">
                        <div className='underline-divider'>
                        <Image
                      src={selectedTutor.avatar_url || "/dav.jpg"} // Use default if no avatar_url
                      alt={`Avatar`}
                      width={68}
                      height={68}
                      className="lg:w-16 lg:h-16 rounded" // Rounded corners for the avatar
                    />
      <h3>{selectedTutor.full_name}</h3>
      <p className='text-xs lg:mb-2'>Tutor</p>
      <p>Specialty: <span className='tag-4'>{selectedTutor.specialty}</span></p>

                        </div>

      {/* <p>Email: {selectedTutor.email}</p> */}
      <div className="underline-divider">

    
      <p>Experience: {selectedTutor.years_of_experience} years</p>
      <h4>Tutor Bio</h4>
      <p className='text-sm'> {selectedTutor.bio}</p>
      </div>
      <h4>Hourly Rate:</h4>
      <div className="flex items-center mb-2">
      <FontAwesomeIcon icon={faDollar} />
      <p className="ml-1 text-sm">{selectedTutor.hourly_rate}/hr</p>
      </div>

      <button className="bg-[#4B0082] text-white px-4 py-2  rounded font-medium inline-flex items-center justify-center tracking-tight w-[100%]"> Book Tutor  </button>    </div>
  ) : (
    <p>Select a tutor to view their details</p>
  )}
        </div>
      </div>
        {/* <div>
          <h1>Welcome, {userName}!</h1>
        </div> */}
        {/* <AvatarUpload/> */}
    </div>
    </div>
    {/* <Footer/> */}
    </>


  );
};