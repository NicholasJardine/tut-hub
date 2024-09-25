import React from "react";
import { useEffect, useState } from "react";
import Image from 'next/image'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faDollar } from '@fortawesome/free-solid-svg-icons';

type Tutor = {
  full_name: string;
  email: string;
  avatar_url: string | null;
  specialty: string;
  years_of_experience: number;
  hourly_rate: number;
  bio: string;
};

type TutorsGridProps = {
  setSelectedTutor: (tutor: Tutor) => void;  // Accept the function to set selected tutor
  tutors: Tutor[]; 
};

const TutorsGrid: React.FC<TutorsGridProps> = ({ setSelectedTutor, tutors }) => {  // Make sure to add setSelectedTutor here
  // const [tutors, setTutors] = useState<Tutor[]>([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchTutors = async () => {
  //     try {
  //       const response = await fetch('/api/alltutors');
  //       const data = await response.json();
  //       if (response.ok) {
  //         setTutors(data.tutors); // Set tutors to the fetched data
  //       } else {
  //         setError(data.message || 'Error fetching tutors');
  //       }
  //     } catch (err) {
  //       setError('An error occurred while fetching tutors');
  //     } finally {
  //       setLoading(false); // Turn off loading when done
  //     }
  //   };

  //   fetchTutors();
  // }, []);

  return (
    <div className="container mx-auto p-4">
      {tutors.length === 0 ? (
        <p>No tutors available.</p>
      ) :error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-white">
          {tutors.map((tutor, index) => (
            <div key={index} onClick={() => setSelectedTutor(tutor)} className="cursor-pointer"> {/* Add onClick here */}
              <div className="p-2 border rounded-lg shadow-md flex flex-col">
                <div className="flex justify-between">
                  <div className="flex">
                    <Image
                      src={tutor.avatar_url || "/dav.jpg"} // Use default if no avatar_url
                      alt={`${tutor.full_name}'s Avatar`}
                      width={42}
                      height={42}
                      className="lg:w-10 lg:h-10 rounded" // Rounded corners for the avatar
                    />

                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
                      <p className="text-xs">Tutor</p>
                    </div>
                  </div>
                  <FontAwesomeIcon icon={faBookmark} className="text-[#FA8340]" />
                </div>

                <div className="mt-2">
                  <p className="tag-4">{tutor.specialty}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faDollar} />
                    <p className="ml-1 text-sm">{tutor.hourly_rate}/hr</p>
                    <p className="ml-12 text-xs lg:whitespace-nowrap">Experience: {tutor.years_of_experience} years</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorsGrid;


















// import React from "react";
// import { useEffect,useState } from "react";
// import Image from 'next/image'; 
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass, faHome, faUniversity, faGraduationCap, faSchool, faChalkboardTeacher, faChartLine, faCalendarAlt, faGlobe, faLaptopHouse, faLock, faBookOpen, faUserGraduate, faCalendarCheck, faLightbulb, faSearch, faDollar, faSave, faBookmark } from '@fortawesome/free-solid-svg-icons';

// type Tutor = {
//     full_name: string;
//     email: string;
//     avatar_url: string | null;
//     specialty: string;
//     years_of_experience: number;
//     hourly_rate: number;
// };

// type TutorsGridProps = {
//   setSelectedTutor: (tutor: Tutor) => void;  // Accept the function to set selected tutor
// };


// const TutorsGrid: React.FC = () => {
//     const [tutors, setTutors] = useState<Tutor[]>([]);
//     const [loading,setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     // const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

//     useEffect(() =>{
//         const fetchTutors = async () => {
//             try {
//                 const response = await fetch('/api/alltutors');
//                 const data = await response.json();
//                 if (response.ok) {
//                   setTutors(data.tutors); // Set tutors to the fetched data
//                 } else {
//                   setError(data.message || 'Error fetching tutors');
//                 }
//               } catch (err) {
//                 setError('An error occurred while fetching tutors');
//               } finally {
//                 setLoading(false); // Turn off loading when done
//               }
//         };

//         fetchTutors();
//     }, []

//     );

//     return(
//         <div className="container mx-auto p-4">
//             {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="grid grid-cols-2 gap-4 text-white">
//                     {tutors.map((tutor, index) => (
//                       <div key={index} onClick={() => setSelectedTutor(tutor)} className="cursor-pointer">

//                         <div key={index} className="p-4 border rounded-lg shadow-md flex flex-col">
//                             {/* Avatar Image */}

//                             <div className="flex justify-between">
//                             <div className="flex">
//                             <Image
//                                 src={tutor.avatar_url || "/dav.jpg"} // Use default if no avatar_url
//                                 alt={`${tutor.full_name}'s Avatar`}
//                                 width={42} // Set width
//                                 height={42} // Set height
//                                 className="lg:w-10 lg:h-10 rounded" // Rounded corners for the avatar
//                             />

//                             {/* Tutor Details */}
//                             <div className="ml-4">
//                                 <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
//                                 <p className="text-xs">Tutor</p>
//                                 {/* <p>{tutor.email}</p> */}
//                             </div>
//                             </div>
//                             <FontAwesomeIcon icon={faBookmark} className="text-[#FA8340]"/>
//                             </div>

//                             <div className="mt-2"><p className="tag-4"> {tutor.specialty}</p></div>
//                             <div className="flex justify-between mt-2">
//                               <div className="flex  items-center">
//                                 <FontAwesomeIcon icon={faDollar}/>
//                                 <p className="ml-1 text-sm">{tutor.hourly_rate}/hr</p>
//                                 <p className="ml-12 text-xs lg: whitespace-nowrap">Experience: {tutor.years_of_experience} years</p>

//                               </div>
//                             </div>

                            
//                         </div>

//                         </div>

//                     ))}
//         </div>
//     )

// }
// </div>
//     );
// };

// export default TutorsGrid




// import React, { useEffect, useState } from "react";

// type Tutor = {
//     full_name: string;
//     email: string;
//     avatar_url: string | null;
//     specialty: string;
//     hourly_rate: number;
//     years_of_experience: number;
//     bio: string; // Add avatar_url to the type
// };

// const TutorsGrid: React.FC = () => {
//     const [tutors, setTutors] = useState<Tutor[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchTutors = async () => {
//             try {
//                 const response = await fetch('/api/alltutors');
//                 const data = await response.json();
//                 if (response.ok) {
//                     setTutors(data.tutors); // Set tutors to the fetched data
//                 } else {
//                     setError(data.message || 'Error fetching tutors');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching tutors');
//             } finally {
//                 setLoading(false); // Turn off loading when done
//             }
//         };

//         fetchTutors();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 <div className="grid grid-cols-2 gap-4 text-white">
//                     {tutors.map((tutor, index) => (
//                         <div key={index} className="p-4 border rounded shadow-md flex items-center">
//                             {/* Avatar Image */}
//                             <img
//                                 src={tutor.avatar_url || "/dav.jpg"} // Use default if no avatar_url
//                                 alt={`${tutor.full_name}'s Avatar`}
//                                 className="w-16 h-16 rounded"
//                                 onError={(e) => {
//                                     e.currentTarget.src = "/dav.jpg"; // Fallback in case of broken link
//                                 }}
//                             />

//                             {/* Tutor Details */}
//                             <div className="ml-4">
//                                 <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
//                                 <p>{tutor.email}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TutorsGrid;





// import React, { useEffect, useState } from "react";
// import Image from 'next/image'; // Import Next.js Image component

// type Tutor = {
//     full_name: string;
//     email: string;
//     avatar_url: string | null; // Add avatar_url to the type
// };

// const TutorsGrid: React.FC = () => {
//     const [tutors, setTutors] = useState<Tutor[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchTutors = async () => {
//             try {
//                 const response = await fetch('/api/alltutors');
//                 const data = await response.json();
//                 if (response.ok) {
//                     setTutors(data.tutors); // Set tutors to the fetched data
//                 } else {
//                     setError(data.message || 'Error fetching tutors');
//                 }
//             } catch (err) {
//                 setError('An error occurred while fetching tutors');
//             } finally {
//                 setLoading(false); // Turn off loading when done
//             }
//         };

//         fetchTutors();
//     }, []);

//     return (
//         <div className="container mx-auto p-4">
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 <div className="grid grid-cols-2 gap-4 text-white">
//                     {tutors.map((tutor, index) => (
//                         <div key={index} className="p-4 border rounded shadow-md flex items-center">
//                             {/* Avatar Image using Next.js Image component */}
//                             <Image
//                                 src={tutor.avatar_url || "/dav.jpg"} // Use default image if no avatar_url
//                                 alt={`${tutor.full_name}'s Avatar`}
//                                 width={64} // Set width
//                                 height={64} // Set height
//                                 className="rounded"
//                                 onError={(e) => {
//                                     e.currentTarget.src = "/dav.jpg"; // Fallback in case of broken link
//                                 }}
//                             />

//                             {/* Tutor Details */}
//                             <div className="ml-4">
//                                 <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
//                                 <p>{tutor.email}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TutorsGrid;
