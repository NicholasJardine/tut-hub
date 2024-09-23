

// "use client";
// import { useState,useEffect } from "react";

// export default function AvatarUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [tutorId, setTutorId] = useState(""); // Add tutorId state

//   // This is where you'd fetch the tutor_id of the currently logged-in user
//   // For now, you can simulate it until you have the logic in place
//   useEffect(() => {
//     // Simulate fetching the logged-in user's tutor ID
//     const fetchedTutorId = "123"; // Replace this with real logic later
//     setTutorId(fetchedTutorId);
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tutor_id", tutorId); // Include tutor_id in form data

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("File uploaded successfully!");
//         setImageUrl(result.imageUrl); // Display the uploaded image URL
//       } else {
//         setMessage(result.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading the file:", error);
//       setMessage("Error uploading the file");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <input type="hidden" name="tutor_id" value={tutorId} /> {/* Hidden tutor_id field */}
//         <button type="submit">Upload Avatar</button>
//       </form>
//       {message && <p>{message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
//     </div>
//   );
// }




// "use client";
// import { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode";

// export default function AvatarUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [tutorId, setTutorId] = useState(""); // Add tutorId state

//   // Function to get the cookie by name
//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   }

//   // Extract tutor ID from the JWT token stored in the cookies
//   useEffect(() => {
//     const token = getCookie("authToken"); // Assuming your token is stored in a cookie called "authToken"
    
//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token); // Decode the token to get user data
//         const fetchedTutorId = decodedToken.tutor_id; // Extract tutor_id from the token payload
//         setTutorId(fetchedTutorId);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         setMessage("Failed to retrieve tutor ID");
//       }
//     } else {
//       setMessage("No token found");
//     }
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tutor_id", tutorId); // Include tutor_id in form data

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("File uploaded successfully!");
//         setImageUrl(result.imageUrl); // Display the uploaded image URL
//       } else {
//         setMessage(result.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading the file:", error);
//       setMessage("Error uploading the file");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <input type="hidden" name="tutor_id" value={tutorId} /> {/* Hidden tutor_id field */}
//         <button type="submit">Upload Avatar</button>
//       </form>
//       {message && <p>{message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect } from "react";
// import jwt_decode from "jwt-decode"; // Import jwt-decode

// export default function AvatarUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [tutorId, setTutorId] = useState(""); // Add tutorId state

  // Function to get the cookie by name
//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   }

//   // Extract tutor ID (or userId) from the JWT token stored in the cookies
//   useEffect(() => {
//     const token = getCookie("token"); // Use the correct token name ("token")
    
//     if (token) {
//       try {
//         const decodedToken = jwt_decode(token); // Decode the token to get user data
//         const fetchedTutorId = decodedToken.tutor_id || decodedToken.userId; // Extract tutor_id or userId based on how you structured the JWT payload
//         setTutorId(fetchedTutorId);
//       } catch (error) {
//         console.error("Error decoding token:", error);
//         setMessage("Failed to retrieve tutor ID");
//       }
//     } else {
//       setMessage("No token found");
//     }
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("tutor_id", tutorId); // Include tutor_id in form data

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("File uploaded successfully!");
//         setImageUrl(result.imageUrl); // Display the uploaded image URL
//       } else {
//         setMessage(result.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading the file:", error);
//       setMessage("Error uploading the file");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <input type="hidden" name="tutor_id" value={tutorId} /> {/* Hidden tutor_id field */}
//         <button type="submit">Upload Avatar</button>
//       </form>
//       {message && <p>{message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";

// export default function AvatarUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file); // Only submit the file, no tutor_id needed

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("File uploaded successfully!");
//         setImageUrl(result.imageUrl); // Display the uploaded image URL
//       } else {
//         setMessage(result.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading the file:", error);
//       setMessage("Error uploading the file");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button type="submit">Upload Avatar</button>
//       </form>
//       {message && <p>{message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
//     </div>
//   );
// }


"use client";
import { useState } from "react";

export default function AvatarUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Append profile fields to form data
    formData.append("bio", bio);
    formData.append("specialty", specialty);
    formData.append("years_of_experience", yearsOfExperience);
    formData.append("hourly_rate", hourlyRate);
    
    // Append file if it's selected
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setImageUrl(result.profile.avatar_url); // Display the updated avatar URL
      } else {
        setMessage(result.message || "Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <div>
          <label>Avatar:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Profile Fields */}
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </div>

        <div>
          <label>Specialty:</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="What are your specialties?"
          />
        </div>

        <div>
          <label>Years of Experience:</label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            placeholder="How many years of experience?"
          />
        </div>

        <div>
          <label>Hourly Rate:</label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="Your hourly rate"
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Update Profile</button>
      </form>

      {/* Display success or error message */}
      {message && <p>{message}</p>}

      {/* Display the uploaded avatar image if available */}
      {imageUrl && <img src={imageUrl} alt="Uploaded Avatar" />}
    </div>
  );
}
