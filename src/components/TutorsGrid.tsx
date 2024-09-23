import React from "react";
import { useEffect,useState } from "react";
import Image from 'next/image'; 

type Tutor = {
    full_name: string;
    email: string;
    avatar_url: string | null;
};

const TutorsGrid: React.FC = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const fetchTutors = async () => {
            try {
                const response = await fetch('/api/alltutors');
                const data = await response.json();
                if (response.ok) {
                  setTutors(data.tutors); // Set tutors to the fetched data
                } else {
                  setError(data.message || 'Error fetching tutors');
                }
              } catch (err) {
                setError('An error occurred while fetching tutors');
              } finally {
                setLoading(false); // Turn off loading when done
              }
        };

        fetchTutors();
    }, []

    );

    return(
        <div className="container mx-auto p-4">
            {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-white">
                    {tutors.map((tutor, index) => (
                        <div key={index} className="p-4 border rounded shadow-md flex items-center">
                            {/* Avatar Image */}
                            <Image
                                src={tutor.avatar_url || "/dav.jpg"} // Use default if no avatar_url
                                alt={`${tutor.full_name}'s Avatar`}
                                width={64} // Set width
                                height={64} // Set height
                                className="rounded" // Rounded corners for the avatar
                            />

                            {/* Tutor Details */}
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{tutor.full_name}</h2>
                                <p>{tutor.email}</p>
                            </div>
                        </div>
                    ))}
        </div>
    )

}
</div>
    );
};

export default TutorsGrid




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
