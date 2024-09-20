"use client";

import '@/components/PriceSlider';
import { useEffect, useState } from 'react';
import { Navbar } from '@/sections/Navbar';
import PriceSlider from '@/components/PriceSlider';
import PlatformSelector from '@/components/PlatformSelector';
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
    <Navbar/>
    <div className="container">
      <div>
        <div className="flex flex-col max-w-[25%]">
          <div className="flex justify-between items-center underline-divider">
            <h3>Filters</h3>
            <p>Reset All</p>
          </div>

          <div className="underline-divider">
          <div> <h3>Search by</h3></div>
          <div className="radio-buttons-group">
              <label>
                <input type="radio" name="sort" value="lowest-rate"/>
                Lowest Rate
              </label>

              <label>
                <input type="radio" name="sort" value="highest-rate"/>
                Highest Rate
              </label>

              <label>
                <input type="radio" name="sort" value="most-experience"/>
                Most Experience
              </label>

              <label>
                <input type="radio" name="sort" value="a-z"/>
                A-Z
              </label>
          </div>


          </div>
          <div className="underline-divider">
            <div><h3>Hourly Rate</h3></div>
            
            <PriceSlider/>
          </div>

          <div className="underline-divider">
            <div><h3>Experience (years)</h3></div>
            <div className="radio-buttons-group">
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
          </div>

          </div>
          <div className="underline-divider">
            <div><h3>Preferred platform</h3></div>
            <PlatformSelector/>
          </div>
          
        </div>

        <div className="flex flex-col">
          
        </div>

        <div className="flex flex-col">
          
        </div>
      </div>
        <div>
          <h1>Welcome, {userName}!</h1>
        </div>
    </div>
    
    </>


  );
};