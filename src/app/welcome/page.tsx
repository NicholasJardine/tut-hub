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

export default function Welcome() {
  const [userName, setUserName] = useState('');

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

  return (
    <>
    <NavTwo/>
    <div className='bg-[#4B0082]'>
    <div className="container mx-auto max-w-[95%] p-4 pt-10">
      <div className='flex justify-between'>
        <div className="flex flex-col w-[25%] bg-[#D3D3FF] text-[#4B0082] px-4 py-2 rounded-lg max-h-[85vh]">
          <div className="flex justify-between items-center underline-divider">
            <h3>Filters</h3>
            <p>Reset All</p>
          </div>

          <div className="underline-divider">
          <div> <h4>Order by</h4></div>
          <div className="grid grid-cols-2 gap-2">
  <label className="flex items-center">
    <input type="radio" name="sort" value="lowest-rate" className="mr-2"/>
    Lowest Rate
  </label>

  <label className="flex items-center">
    <input type="radio" name="sort" value="highest-rate" className="mr-2 whitespace-nowrap"/>
    Highest Rate
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input type="radio" name="sort" value="most-experience" className="mr-2"/>
    Most Experience
  </label>
</div>



          </div>
          <div className="underline-divider">
            <div><h4>Hourly Rate</h4></div>
            
            <div className='max-w-[95%]'> <PriceSlider/></div>
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
    <input type="radio" name="sort" value="lowest-rate" className="mr-2"/>
    0-1
  </label>

  <label className="flex items-center">
    <input type="radio" name="sort" value="highest-rate" className="mr-2 whitespace-nowrap"/>
    1-3
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input type="radio" name="sort" value="most-experience" className="mr-2"/>
    3-5
  </label>

  <label className="flex items-center whitespace-nowrap">
    <input type="radio" name="sort" value="most-experience" className="mr-2"/>
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
          <SearchBar/>
          <div className="flex justify-between items-center">
          <h3 className='text-white'>Search results</h3>
          <p className='text-white'>50 results found</p>
          </div>
          <TutorsGrid/>
          
        </div>

        <div className="flex flex-col w-[25%] bg-[#D3D3FF] text-[#4B0082] rounded-lg max-h-[85vh]">
          
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