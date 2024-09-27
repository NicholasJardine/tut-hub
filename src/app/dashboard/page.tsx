// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];
// type Booking = {
//     id: number;
//     student_id: number;
//     tutor_id: number;
//     booking_date: string;  // Date string from the database
//     appointment_time: string;  // Time string from the database
//     status: string;            // 'booked' or 'cancelled'
//   };


// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state

//   // Time slots from 10 AM to 7 PM
//   const timeSlots = [
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//     "6:00 PM",
//     "7:00 PM",
//   ];

//   // Weekday Labels
//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('/api/bookings', {
//           method: 'GET',
//           credentials: 'include',  // Send cookies with request
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBookings(data.bookings);
//         } else {
//           console.error("Error fetching bookings:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const getStudentName = (studentId: number) => {
//     // This would normally look up the student by ID, but for now, return a placeholder name.
//     return `Student ${studentId}`;
//   };

//   // Extract the current day of the week and use it as a reference
//   const selectedDay = value instanceof Date ? value.getDay() : 0;

//   // Generate days around the selected date
//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = selectedDate.getDate() - selectedDate.getDay() + 1; // Monday as start of the week

//   // Create a list of dates for each day in the week
//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(selectedDate);
//     currentDay.setDate(startOfWeek + index); // Set the date based on the start of the week
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//     };
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <div className="flex justify-between space-x-4">
//         {/* Calendar */}
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar
//               onChange={onChange}
//               value={value}
//               className="rounded-lg shadow-md" // Add custom class for styling
//             />
//           </div>
//           <div className="flex flex-col space-y-2">
//             <p className="font-medium text-gray-700">Next appointment:</p>
//             <div className="flex justify-between space-x-2">
//               <button className="btn btn-primary text-white py-2 px-4 rounded hover:bg-blue-700">
//                 Button 1
//               </button>
//               <button className="btn btn-text text-[#4B0082] py-2 px-4 rounded hover:bg-green-700">
//                 Button 2
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <div>
//             <h2 className="text-xl font-semibold mb-4">
//               Appointments for {selectedDate.toLocaleDateString()}
//             </h2>
//           </div>
//           <div className="grid grid-cols-8 gap-0">
//             {/* Top Row (Days of the Week) */}
//             <div></div> {/* Empty top-left corner for time */}
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDay === (index + 1) % 7
//                     ? "bg-[#4B0082] text-white" // Highlight the selected day
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {/* Time Slots + Empty Grid Slots */}
//             {timeSlots.map((time, index) => (
//               <React.Fragment key={index}>
//                 {/* Time Column */}
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {/* Empty slots for each day */}
//                 {daysOfWeek.map((day, idx) => (
//                   <div
//                     key={idx}
//                     className={`border border-gray-300 p-6 hover:bg-gray-100${
//                       selectedDay === (idx + 1) % 7 ? "bg-blue-100" : ""
//                     }`}
//                   ></div>
//                 ))}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Booking = {
//   id: number;
//   student_id: number;
//   tutor_id: number;
//   booking_date: string;  // Date string from the database (YYYY-MM-DD)
//   appointment_time: string;  // Time string from the database (HH:MM:SS)
//   status: string;            // 'booked' or 'cancelled'
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state

//   // Time slots from 10 AM to 7 PM in HH:MM format
//   const timeSlots: { [key: string]: string } = {
//     "08:00:00": "8:00 AM",
//     "09:00:00": "9:00 AM",
//     "10:00:00": "10:00 AM",
//     "11:00:00": "11:00 AM",
//     "12:00:00": "12:00 PM",
//     "13:00:00": "1:00 PM",
//     "14:00:00": "2:00 PM",
//     "15:00:00": "3:00 PM",
//     "16:00:00": "4:00 PM",
//     "17:00:00": "5:00 PM",
//     "18:00:00": "6:00 PM",
//     "19:00:00": "7:00 PM",
//   };

//   // Weekday Labels
//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('/api/bookings', {
//           method: 'GET',
//           credentials: 'include',  // Send cookies with request
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBookings(data.bookings);
//         } else {
//           console.error("Error fetching bookings:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const getStudentName = (studentId: number) => {
//     // This would normally look up the student by ID, but for now, return a placeholder name.
//     return `Student ${studentId}`;
//   };

//   // Extract the current day of the week and use it as a reference
//   const selectedDay = value instanceof Date ? value.getDay() : 0;

//   // Generate days around the selected date
//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = selectedDate.getDate() - selectedDate.getDay() + 1; // Monday as start of the week

//   // Create a list of dates for each day in the week
//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(selectedDate);
//     currentDay.setDate(startOfWeek + index); // Set the date based on the start of the week
//     return {
//       dayLabel: day,
//       fullDate: currentDay.toISOString().split("T")[0], // Full date in YYYY-MM-DD format
//       dayNumber: currentDay.getDate(),
//     };
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <div className="flex justify-between space-x-4">
//         {/* Calendar */}
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar
//               onChange={onChange}
//               value={value}
//               className="rounded-lg shadow-md" // Add custom class for styling
//             />
//           </div>
//           <div className="flex flex-col space-y-2">
//             <p className="font-medium text-gray-700">Next appointment:</p>
//             <div className="flex justify-between space-x-2">
//               <button className="btn btn-primary text-white py-2 px-4 rounded hover:bg-blue-700">
//                 Button 1
//               </button>
//               <button className="btn btn-text text-[#4B0082] py-2 px-4 rounded hover:bg-green-700">
//                 Button 2
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <div>
//             <h2 className="text-xl font-semibold mb-4">
//               Appointments for {selectedDate.toLocaleDateString()}
//             </h2>
//           </div>
//           <div className="grid grid-cols-8 gap-0">
//             {/* Top Row (Days of the Week) */}
//             <div></div> {/* Empty top-left corner for time */}
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDay === (index + 1) % 7
//                     ? "bg-[#4B0082] text-white" // Highlight the selected day
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {/* Time Slots + Bookings Display */}
//             {Object.entries(timeSlots).map(([dbTime, displayTime], index) => (
//               <React.Fragment key={index}>
//                 {/* Time Column */}
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{displayTime}</div>

//                 {/* Display Bookings for each day */}
//                 {weekDays.map((dayObj, idx) => {
//                   const matchingBooking = bookings.find(
//                     (booking) =>
//                       booking.appointment_time === dbTime &&
//                       booking.booking_date === dayObj.fullDate
//                   );

//                   return (
//                     <div
//                       key={idx}
//                       className={`border border-gray-300 p-6 ${
//                         matchingBooking ? "bg-green-200" : ""
//                       } hover:bg-gray-100`}
//                     >
//                       {matchingBooking && (
//                         <div>
//                           <p>{getStudentName(matchingBooking.student_id)}</p>
//                           <p>{matchingBooking.status}</p>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Booking = {
//   id: number;
//   student_id: number;
//   tutor_id: number;
//   booking_date: string;  // Date string from the database (ISO format)
//   appointment_time: string;  // Time string from the database (HH:MM:SS)
//   status: string;            // 'booked' or 'cancelled'
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state

//   const timeSlots = [
//     "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
//     "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
//   ];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//   const [availability, setAvailability] = useState({});
//   const handleSetUnavailable = async (day: string, time: string) => {
//     // Simulate marking slot as unavailable
//     const newAvailability = { ...availability, [`${day}-${time}`]: "unavailable" };
//     setAvailability(newAvailability);
  
//     // API call to mark as unavailable in the database
//     await fetch('/api/availability', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         tutor_id: 1, // Replace with actual tutor ID
//         day_of_week: day,
//         start_time: time,
//         end_time: time, // Assuming start and end time are the same for simplicity
//         status: "unavailable",
//       }),
//     });
//   };
  
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('/api/bookings', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBookings(data.bookings);
//         } else {
//           console.error("Error fetching bookings:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const getStudentName = (studentId: number) => {
//     return `Student ${studentId}`;
//   };

//   // Calculate the start of the week based on the selected date
//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   // Create the week days array
//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay, // Full Date for comparison
//     };
//   });

//   // Time string comparison helper (convert from DB format to 12-hour format)
//   const dbTimeTo12Hour: { [key: string]: string } = {
//     "10:00:00": "10:00 AM",
//     "11:00:00": "11:00 AM",
//     "12:00:00": "12:00 PM",
//     "13:00:00": "1:00 PM",
//     "14:00:00": "2:00 PM",
//     "15:00:00": "3:00 PM",
//     "16:00:00": "4:00 PM",
//     "17:00:00": "5:00 PM",
//     "18:00:00": "6:00 PM",
//     "19:00:00": "7:00 PM",
//   };

  

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <div className="flex justify-between space-x-4">
//         {/* Calendar */}
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar
//               onChange={onChange}
//               value={value}
//               className="rounded-lg shadow-md"
//             />
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Appointments for {selectedDate.toLocaleDateString()}
//           </h2>
//           <div className="grid grid-cols-8 gap-0">
//             {/* Top Row (Days of the Week) */}
//             <div></div> {/* Empty top-left corner for time */}
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDate.getDate() === dayObj.dayNumber
//                     ? "bg-[#4B0082] text-white" // Highlight selected day
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {/* Time Slots + Booking Data */}
//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 {/* Time Column */}
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {/* Empty slots for each day */}
//                 {weekDays.map((dayObj, dayIndex) => {
//                   const matchingBooking = bookings.find(
//                     (booking) =>
//                       dbTimeTo12Hour[booking.appointment_time as string] === time && // Match time with type assertion
//                       new Date(booking.booking_date).toDateString() === dayObj.fullDate.toDateString() // Match date
//                   );

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 ${
//                         selectedDate.getDate() === dayObj.dayNumber
//                           ? "bg-blue-100"  // Highlight the column of the selected day
//                           : matchingBooking ? "bg-[#FA8340]" : ""
//                       } hover:bg-gray-100`}
//                     >
//                       {matchingBooking && (
//                         <div>
//                           <p>{getStudentName(matchingBooking.student_id)}</p>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Booking = {
//   id: number;
//   student_id: number;
//   tutor_id: number;
//   booking_date: string;  // Date string from the database (ISO format)
//   appointment_time: string;  // Time string from the database (HH:MM:SS)
//   status: string;            // 'booked' or 'cancelled'
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
//   const [availability, setAvailability] = useState<{ [key: string]: string }>({}); // Add availability state
//   const [hoveredSlot, setHoveredSlot] = useState<{ day: string; time: string } | null>(null); // Track hovered slot

//   const timeSlots = [
//     "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
//     "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
//   ];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//     // Time string comparison helper (convert from DB format to 12-hour format)
//     const dbTimeTo12Hour: { [key: string]: string } = {
//         "10:00:00": "10:00 AM",
//         "11:00:00": "11:00 AM",
//         "12:00:00": "12:00 PM",
//         "13:00:00": "1:00 PM",
//         "14:00:00": "2:00 PM",
//         "15:00:00": "3:00 PM",
//         "16:00:00": "4:00 PM",
//         "17:00:00": "5:00 PM",
//         "18:00:00": "6:00 PM",
//         "19:00:00": "7:00 PM",
//       };
//       const time12ToDbTime = Object.entries(dbTimeTo12Hour).reduce((acc, [key, value]) => {
//         acc[value] = key;
//         return acc;
//       }, {} as { [key: string]: string });
    
      

//       const handleSetUnavailable = async (day: string, time: string) => {
//         const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format
      
//         // Simulate marking slot as unavailable
//         const newAvailability = { ...availability, [`${day}-${time}`]: "unavailable" };
//         setAvailability(newAvailability);
      
//         // API call to mark as unavailable in the database
//         await fetch('/api/availability', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             tutor_id: 1, // Replace with actual tutor ID
//             available_date: new Date().toISOString().split('T')[0], // Use actual logic for available_date
//             available_start_time: startTime24h, // Send in HH:MM:SS format
//             status: "unavailable",
//           }),
//         });
//       };
      

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('/api/bookings', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBookings(data.bookings);
//         } else {
//           console.error("Error fetching bookings:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const getStudentName = (studentId: number) => {
//     return `Student ${studentId}`;
//   };

//   // Calculate the start of the week based on the selected date
//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   // Create the week days array
//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay, // Full Date for comparison
//     };
//   });


//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <div className="flex justify-between space-x-4">
//         {/* Calendar */}
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar
//               onChange={onChange}
//               value={value}
//               className="rounded-lg shadow-md"
//             />
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Appointments for {selectedDate.toLocaleDateString()}
//           </h2>
//           <div className="grid grid-cols-8 gap-0">
//             {/* Top Row (Days of the Week) */}
//             <div></div> {/* Empty top-left corner for time */}
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDate.getDate() === dayObj.dayNumber
//                     ? "bg-[#4B0082] text-white" // Highlight selected day
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {/* Time Slots + Booking Data */}
//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 {/* Time Column */}
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {/* Empty slots for each day */}
//                 {weekDays.map((dayObj, dayIndex) => {
//                   const matchingBooking = bookings.find(
//                     (booking) =>
//                       dbTimeTo12Hour[booking.appointment_time as string] === time && // Match time with type assertion
//                       new Date(booking.booking_date).toDateString() === dayObj.fullDate.toDateString() // Match date
//                   );

//                   const isUnavailable = availability[`${dayObj.dayLabel}-${time}`] === "unavailable";
//                   const isFreeSlot = !matchingBooking && !isUnavailable;

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 flex justify-center items-center ${
//                         selectedDate.getDate() === dayObj.dayNumber
//                           ? "bg-blue-100"  // Highlight the column of the selected day
//                           : matchingBooking
//                           ? "bg-[#FA8340]"
//                           : isUnavailable
//                           ? "bg-red-300"
//                           : "bg-green-200"
//                       } hover:opacity-50`}
//                       onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.dayLabel, time })}
//                       onMouseLeave={() => setHoveredSlot(null)}
//                     >
//                       {matchingBooking ? (
//                         <div>
//                           <p>{getStudentName(matchingBooking.student_id)}</p>
//                         </div>
//                       ) : isUnavailable ? (
//                       <div><p>Unavailable</p></div>

//                       ) : hoveredSlot?.day === dayObj.dayLabel && hoveredSlot?.time === time ? (
//                        <div> <button className='btn btn-primary text-xs opacity-1' onClick={() => handleSetUnavailable(dayObj.dayLabel, time)}>
//                           Set as Unavailable
//                         </button></div>
//                       ) :  (
//                         <div>Free</div>
 
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import calendar styles

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Booking = {
//   id: number;
//   student_id: number;
//   tutor_id: number;
//   booking_date: string;  // Date string from the database (ISO format)
//   appointment_time: string;  // Time string from the database (HH:MM:SS)
//   status: string;            // 'booked' or 'cancelled'
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
//   const [availability, setAvailability] = useState<{ [key: string]: string }>({}); // Add availability state
//   const [hoveredSlot, setHoveredSlot] = useState<{ day: string; time: string } | null>(null); // Track hovered slot

//   const timeSlots = [
//     "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
//     "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
//   ];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

//   // Time string comparison helper (convert from DB format to 12-hour format)
//   const dbTimeTo12Hour: { [key: string]: string } = {
//     "10:00:00": "10:00 AM",
//     "11:00:00": "11:00 AM",
//     "12:00:00": "12:00 PM",
//     "13:00:00": "1:00 PM",
//     "14:00:00": "2:00 PM",
//     "15:00:00": "3:00 PM",
//     "16:00:00": "4:00 PM",
//     "17:00:00": "5:00 PM",
//     "18:00:00": "6:00 PM",
//     "19:00:00": "7:00 PM",
//   };
  
//   const time12ToDbTime = Object.entries(dbTimeTo12Hour).reduce((acc, [key, value]) => {
//     acc[value] = key;
//     return acc;
//   }, {} as { [key: string]: string });
  
//   // Updated handleSetUnavailable function to pass full date
//   const handleSetUnavailable = async (dayObj: { fullDate: Date }, time: string) => {
//     const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format
//     const availableDate = dayObj.fullDate.toISOString().split('T')[0]; // Format the full date for the day

//     // Simulate marking slot as unavailable
//     const newAvailability = { ...availability, [`${availableDate}-${time}`]: "unavailable" };
//     setAvailability(newAvailability);

//     // API call to mark as unavailable in the database
//     await fetch('/api/availability', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         tutor_id: 1, // Replace with actual tutor ID
//         available_date: availableDate, // Send the correct date for the slot
//         available_start_time: startTime24h, // Send in HH:MM:SS format
//         status: "unavailable",
//       }),
//     });
//   };

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('/api/bookings', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setBookings(data.bookings);
//         } else {
//           console.error("Error fetching bookings:", data.message);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const getStudentName = (studentId: number) => {
//     return `Student ${studentId}`;
//   };

//   // Calculate the start of the week based on the selected date
//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   // Create the week days array
//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay, // Full Date for comparison
//     };
//   });

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <div className="flex justify-between space-x-4">
//         {/* Calendar */}
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar
//               onChange={onChange}
//               value={value}
//               className="rounded-lg shadow-md"
//             />
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">
//             Appointments for {selectedDate.toLocaleDateString()}
//           </h2>
//           <div className="grid grid-cols-8 gap-0">
//             {/* Top Row (Days of the Week) */}
//             <div></div> {/* Empty top-left corner for time */}
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDate.getDate() === dayObj.dayNumber
//                     ? "bg-[#4B0082] text-white" // Highlight selected day
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {/* Time Slots + Booking Data */}
//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 {/* Time Column */}
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {/* Empty slots for each day */}
//                 {weekDays.map((dayObj, dayIndex) => {
//                   const matchingBooking = bookings.find(
//                     (booking) =>
//                       dbTimeTo12Hour[booking.appointment_time as string] === time && // Match time with type assertion
//                       new Date(booking.booking_date).toDateString() === dayObj.fullDate.toDateString() // Match date
//                   );

//                   const isUnavailable = availability[`${dayObj.fullDate}-${time}`] === "unavailable";
//                   const isFreeSlot = !matchingBooking && !isUnavailable;

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 flex justify-center items-center ${
//                         selectedDate.getDate() === dayObj.dayNumber
//                           ? "bg-blue-100"  // Highlight the column of the selected day
//                           : matchingBooking
//                           ? "bg-[#FA8340]"
//                           : isUnavailable
//                           ? "bg-red-300"
//                           : "bg-green-200"
//                       } hover:opacity-50`}
//                       onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.dayLabel, time })}
//                       onMouseLeave={() => setHoveredSlot(null)}
//                     >
//                       {matchingBooking ? (
//                         <div>
//                           <p>{getStudentName(matchingBooking.student_id)}</p>
//                         </div>
//                       ) : isUnavailable ? (
//                         <div><p>Unavailable</p></div>
//                       ) : hoveredSlot?.day === dayObj.dayLabel && hoveredSlot?.time === time ? (
//                         <div> 
//                           <button className='btn btn-primary text-xs opacity-1' 
//                                   onClick={() => handleSetUnavailable(dayObj, time)}>
//                             Set as Unavailable
//                           </button>
//                         </div>
//                       ) : (
//                         <div>Free</div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//       );
//     }




"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Booking = {
  id: number;
  student_id: number;
  tutor_id: number;
  booking_date: string;  // Date string from the database (ISO format)
  appointment_time: string;  // Time string from the database (HH:MM:SS)
  status: string;            // 'booked' or 'cancelled'
};

export default function Dashboard() {
  const [value, onChange] = useState<Value>(new Date()); // Store selected date
  const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
  const [availability, setAvailability] = useState<{ [key: string]: string }>({}); // Add availability state
  const [hoveredSlot, setHoveredSlot] = useState<{ day: string; time: string } | null>(null); // Track hovered slot

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Time string comparison helper (convert from DB format to 12-hour format)
  const dbTimeTo12Hour: { [key: string]: string } = {
    "10:00:00": "10:00 AM",
    "11:00:00": "11:00 AM",
    "12:00:00": "12:00 PM",
    "13:00:00": "1:00 PM",
    "14:00:00": "2:00 PM",
    "15:00:00": "3:00 PM",
    "16:00:00": "4:00 PM",
    "17:00:00": "5:00 PM",
    "18:00:00": "6:00 PM",
    "19:00:00": "7:00 PM",
  };

  const time12ToDbTime = Object.entries(dbTimeTo12Hour).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as { [key: string]: string });

  const handleSetUnavailable = async (day: string, time: string) => {
    const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format

    const newAvailability = { ...availability, [`${day}-${time}`]: "unavailable" };
    setAvailability(newAvailability);

    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutor_id: 1, // Replace with actual tutor ID
          available_date: new Date().toISOString().split('T')[0], // Use actual logic for available_date
          available_start_time: startTime24h, // Send in HH:MM:SS format
          status: "unavailable",
        }),
      });

      if (response.ok) {
        // Update the local state to reflect the availability change
        setAvailability(prev => ({
          ...prev,
          [`${day}-${time}`]: "unavailable",
        }));
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setBookings(data.bookings);
        } else {
          console.error("Error fetching bookings:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookings();
  }, []);

  const getStudentName = (studentId: number) => {
    return `Student ${studentId}`;
  };

  const selectedDate = value instanceof Date ? value : new Date();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

  const weekDays = daysOfWeek.map((day, index) => {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + index);
    return {
      dayLabel: day,
      dayNumber: currentDay.getDate(),
      fullDate: currentDay,
    };
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="flex justify-between space-x-4">
        {/* Calendar */}
        <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-2">Your Calendar</div>
          <div className="max-w-full mb-4">
            <Calendar
              onChange={onChange}
              value={value}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Timetable */}
        <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Appointments for {selectedDate.toLocaleDateString()}
          </h2>
          <div className="grid grid-cols-8 gap-0">
            <div></div>
            {weekDays.map((dayObj, index) => (
              <div
                key={index}
                className={`text-center font-semibold p-2 ${
                  selectedDate.getDate() === dayObj.dayNumber
                    ? "bg-[#4B0082] text-white"
                    : "bg-[#D3D3FF]"
                }`}
              >
                {dayObj.dayLabel}
                <br />
                {dayObj.dayNumber}
              </div>
            ))}

            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={timeIndex}>
                <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

                {weekDays.map((dayObj, dayIndex) => {
                  const matchingBooking = bookings.find(
                    (booking) =>
                      dbTimeTo12Hour[booking.appointment_time as string] === time &&
                      new Date(booking.booking_date).toDateString() === dayObj.fullDate.toDateString()
                  );

                  const isUnavailable = availability[`${dayObj.dayLabel}-${time}`] === "unavailable";
                  const isFreeSlot = !matchingBooking && !isUnavailable;

                  return (
                    <div
                      key={dayIndex}
                      className={`border border-gray-300 p-6 flex justify-center items-center ${
                        selectedDate.getDate() === dayObj.dayNumber
                          ? "bg-blue-100"
                          : matchingBooking
                          ? "bg-[#FA8340]"
                          : isUnavailable
                          ? "bg-red-300"
                          : "bg-green-200"
                      } hover:opacity-50`}
                      onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.dayLabel, time })}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      {matchingBooking ? (
                        <div>
                          <p>{getStudentName(matchingBooking.student_id)}</p>
                        </div>
                      ) : isUnavailable ? (
                        <div><p>Unavailable</p></div>
                      ) : hoveredSlot?.day === dayObj.dayLabel && hoveredSlot?.time === time ? (
                        <div>
                          <button className='btn btn-primary text-xs opacity-1' onClick={() => handleSetUnavailable(dayObj.dayLabel, time)}>
                            Set as Unavailable
                          </button>
                        </div>
                      ) : (
                        <div>Free</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
