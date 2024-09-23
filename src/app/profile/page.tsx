// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // To redirect after form submission

// export default function ProfileForm() {
//   const router = useRouter(); // For navigation after submit
//   const [formData, setFormData] = useState({
//     bio: '',
//     specialty: '',
//     years_of_experience: '',
//     hourly_rate: '',
//     avatar: null as File | null,  // For the image upload
//     tutor_id: '',  // Hidden tutor ID
//   });

//   // Fetch tutor ID (assuming it's stored in JWT and can be fetched from the API)
//   useEffect(() => {
//     const getTutorId = async () => {
//       try {
//         const response = await fetch('/api/tutors', {
//           method: 'GET',
//           credentials: 'include',  // Ensure cookies are sent with the request
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setFormData(prevFormData => ({
//             ...prevFormData,
//             tutor_id: data.tutor_id,  // Automatically set tutor ID
//           }));
//         } else {
//           console.error('Error fetching tutor ID:', data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching tutor ID:', error);
//       }
//     };

//     getTutorId();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;  // Get the uploaded file
//     setFormData({
//       ...formData,
//       avatar: file,  // Set the avatar file
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Construct a FormData object to handle file uploads
//     const data = new FormData();
//     data.append('bio', formData.bio);
//     data.append('specialty', formData.specialty);
//     data.append('years_of_experience', formData.years_of_experience);
//     data.append('hourly_rate', formData.hourly_rate);
//     data.append('avatar', formData.avatar || '');  // Handle file upload
//     data.append('tutor_id', formData.tutor_id);  // Attach tutor ID

//     try {
//       const response = await fetch('/api/profile', {
//         method: 'POST',
//         body: data,
//         credentials: 'include',
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log('Profile updated successfully:', result);
//         router.push('/welcome');  // Redirect to welcome page after success
//       } else {
//         console.error('Error updating profile:', result.message);
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <form encType="multipart/form-data" onSubmit={handleSubmit}>
//       <div>
//         <label>Bio</label>
//         <textarea
//           name="bio"
//           value={formData.bio}
//           onChange={handleChange}
//           placeholder="Write a short bio"
//         />
//       </div>

//       <div>
//         <label>Specialty</label>
//         <input
//           type="text"
//           name="specialty"
//           value={formData.specialty}
//           onChange={handleChange}
//           placeholder="Enter your specialty"
//         />
//       </div>

//       <div>
//         <label>Years of Experience</label>
//         <input
//           type="number"
//           name="years_of_experience"
//           value={formData.years_of_experience}
//           onChange={handleChange}
//           placeholder="Enter years of experience"
//         />
//       </div>

//       <div>
//         <label>Hourly Rate</label>
//         <input
//           type="number"
//           name="hourly_rate"
//           value={formData.hourly_rate}
//           onChange={handleChange}
//           placeholder="Enter your hourly rate"
//         />
//       </div>

//       <div>
//         <label>Avatar</label>
//         <input
//           type="file"
//           name="avatar"
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </div>

//       <input type="hidden" name="tutor_id" value={formData.tutor_id} />  {/* Hidden Tutor ID */}

//       <button type="submit">Submit</button>
//     </form>
//   );
// }

import AvatarUpload from '@/sections/AvatarUpload' ; // Adjust the import path as needed

export default function ProfilePage() {
  return (
    <div>
      <h1>Update Your Profile</h1>
      <AvatarUpload /> {/* Render the AvatarUpload component here */}
    </div>
  );
}

