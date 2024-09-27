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

//   const handleSetUnavailable = async (day: string, time: string) => {
//     const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format

//     const newAvailability = { ...availability, [`${day}-${time}`]: "unavailable" };
//     setAvailability(newAvailability);

//     try {
//       const response = await fetch('/api/availability', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tutor_id: 1, // Replace with actual tutor ID
//           available_date: new Date().toISOString().split('T')[0], // Use actual logic for available_date
//           available_start_time: startTime24h, // Send in HH:MM:SS format
//           status: "unavailable",
//         }),
//       });

//       if (response.ok) {
//         // Update the local state to reflect the availability change
//         setAvailability(prev => ({
//           ...prev,
//           [`${day}-${time}`]: "unavailable",
//         }));
//       }
//     } catch (error) {
//       console.error('Failed to update availability:', error);
//     }
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

//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay,
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
//             <div></div>
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${
//                   selectedDate.getDate() === dayObj.dayNumber
//                     ? "bg-[#4B0082] text-white"
//                     : "bg-[#D3D3FF]"
//                 }`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {weekDays.map((dayObj, dayIndex) => {
//                   const matchingBooking = bookings.find(
//                     (booking) =>
//                       dbTimeTo12Hour[booking.appointment_time as string] === time &&
//                       new Date(booking.booking_date).toDateString() === dayObj.fullDate.toDateString()
//                   );

//                   const isUnavailable = availability[`${dayObj.dayLabel}-${time}`] === "unavailable";
//                   const isFreeSlot = !matchingBooking && !isUnavailable;

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 flex justify-center items-center ${
//                         selectedDate.getDate() === dayObj.dayNumber
//                           ? "bg-blue-100"
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
//                           <button className='btn btn-primary text-xs opacity-1' onClick={() => handleSetUnavailable(dayObj.dayLabel, time)}>
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

// type Availability = {
//   tutor_id: number;
//   available_date: string;
//   available_start_time: string;
//   status: string;
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
//   const [availability, setAvailability] = useState<Availability[]>([]); // Add availability state
//   const [hoveredSlot, setHoveredSlot] = useState<{ day: Date; time: string } | null>(null); // Track hovered slot

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

//   // Fetch availability for the current week
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         const response = await fetch('/api/availability', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setAvailability(data.availabilities || []);
//         } else {
//           console.error("Error fetching availability:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching availability:", error);
//       }
//     };

//     fetchAvailability();
//   }, [value]); // Fetch whenever the selected date changes

//   const handleSetUnavailable = async (day: Date, time: string) => {
//     const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format
//     const formattedDate = day.toISOString().split('T')[0]; // Format day to YYYY-MM-DD

//     // API call to mark as unavailable in the database
//     try {
//       const response = await fetch('/api/availability', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tutor_id: 1, // Replace with actual tutor ID
//           available_date: formattedDate, // Send the exact date of the time slot
//           available_start_time: startTime24h, // Send in HH:MM:SS format
//           status: "unavailable",
//         }),
//       });

//       if (response.ok) {
//         setAvailability(prev => [
//           ...prev,
//           { tutor_id: 1, available_date: formattedDate, available_start_time: startTime24h, status: "unavailable" },
//         ]);
//       }
//     } catch (error) {
//       console.error('Failed to update availability:', error);
//     }
//   };

//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay,
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
//             <Calendar onChange={onChange} value={value} className="rounded-lg shadow-md" />
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Appointments for {selectedDate.toLocaleDateString()}</h2>
//           <div className="grid grid-cols-8 gap-0">
//             <div></div>
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${selectedDate.getDate() === dayObj.dayNumber ? "bg-[#4B0082] text-white" : "bg-[#D3D3FF]"}`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {weekDays.map((dayObj, dayIndex) => {
//                   const isUnavailable = availability.some(
//                     (slot) =>
//                       new Date(slot.available_date).toISOString().split('T')[0] === dayObj.fullDate.toISOString().split('T')[0] &&
//                       slot.available_start_time === time12ToDbTime[time]
//                   );

//                   const isFreeSlot = !isUnavailable;

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 flex justify-center items-center ${
//                         selectedDate.getDate() === dayObj.dayNumber ? "bg-blue-100" : isUnavailable ? "bg-red-300" : "bg-green-200"
//                       } hover:opacity-50`}
//                       onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.fullDate, time })}
//                       onMouseLeave={() => setHoveredSlot(null)}
//                     >
//                       {isUnavailable ? (
//                         <div><p>Unavailable</p></div>
//                       ) : hoveredSlot?.day === dayObj.fullDate && hoveredSlot?.time === time ? (
//                         <div>
//                           <button className="btn btn-primary text-xs opacity-1" onClick={() => handleSetUnavailable(dayObj.fullDate, time)}>
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

// type Availability = {
//   tutor_id: number;
//   available_date: string;
//   available_start_time: string;
//   status: string;
// };

// export default function Dashboard() {
//   const [value, onChange] = useState<Value>(new Date()); // Store selected date
//   const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
//   const [availability, setAvailability] = useState<Availability[]>([]); // Add availability state
//   const [hoveredSlot, setHoveredSlot] = useState<{ day: Date; time: string } | null>(null); // Track hovered slot

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

//   const handleSetUnavailable = async (day: Date, time: string) => {
//     const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format
//     const formattedDate = day.toISOString().split('T')[0]; // Format day to YYYY-MM-DD

//     // API call to mark as unavailable in the database
//     try {
//       const response = await fetch('/api/availability', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tutor_id: 1, // Replace with actual tutor ID
//           available_date: formattedDate, // Send the exact date of the time slot
//           available_start_time: startTime24h, // Send in HH:MM:SS format
//           status: "unavailable",
//         }),
//       });

//       if (response.ok) {
//         setAvailability(prev => [
//           ...prev,
//           { tutor_id: 1, available_date: formattedDate, available_start_time: startTime24h, status: "unavailable" },
//         ]);
//       }
//     } catch (error) {
//       console.error('Failed to update availability:', error);
//     }
//   };

//   // Fetch availability for the current week
//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         const response = await fetch('/api/availability', {
//           method: 'GET',
//           credentials: 'include',
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setAvailability(data.availabilities || []);
//         } else {
//           console.error("Error fetching availability:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching availability:", error);
//       }
//     };

//     fetchAvailability();
//   }, [value]); // Fetch whenever the selected date changes

//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday as the start of the week

//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay,
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
//             <Calendar onChange={onChange} value={value} className="rounded-lg shadow-md" />
//           </div>
//         </div>

//         {/* Timetable */}
//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Appointments for {selectedDate.toLocaleDateString()}</h2>
//           <div className="grid grid-cols-8 gap-0">
//             <div></div>
//             {weekDays.map((dayObj, index) => (
//               <div
//                 key={index}
//                 className={`text-center font-semibold p-2 ${selectedDate.getDate() === dayObj.dayNumber ? "bg-[#4B0082] text-white" : "bg-[#D3D3FF]"}`}
//               >
//                 {dayObj.dayLabel}
//                 <br />
//                 {dayObj.dayNumber}
//               </div>
//             ))}

//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {weekDays.map((dayObj, dayIndex) => {
//                   const isUnavailable = availability.some(
//                     (slot) =>
//                       new Date(slot.available_date).toISOString().split('T')[0] === dayObj.fullDate.toISOString().split('T')[0] &&
//                       slot.available_start_time === time12ToDbTime[time]
//                   );

//                   const isFreeSlot = !isUnavailable;

//                   return (
//                     <div
//                       key={dayIndex}
//                       className={`border border-gray-300 p-6 flex justify-center items-center ${
//                         selectedDate.getDate() === dayObj.dayNumber ? "bg-blue-100" : isUnavailable ? "bg-red-300" : "bg-green-200"
//                       } hover:opacity-50`}
//                       onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.fullDate, time })}
//                       onMouseLeave={() => setHoveredSlot(null)}
//                     >
//                       {isUnavailable ? (
//                         <div><p>Unavailable</p></div>
//                       ) : hoveredSlot?.day.getTime() === dayObj.fullDate.getTime() && hoveredSlot?.time === time ? (
//                         <div>
//                           <button className="btn btn-primary text-xs opacity-1" onClick={() => handleSetUnavailable(dayObj.fullDate, time)}>
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
//   );
// }



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

type Availability = {
  tutor_id: number;
  available_date: string; // Date stored in UTC format (YYYY-MM-DD)
  available_start_time: string; // Time stored in HH:MM:SS format
  status: string;
};

export default function Dashboard() {
  const [value, onChange] = useState<Value>(new Date()); // Store selected date
  const [bookings, setBookings] = useState<Booking[]>([]);  // Add bookings state
  const [availability, setAvailability] = useState<Availability[]>([]); // Add availability state
  const [hoveredSlot, setHoveredSlot] = useState<{ day: Date; time: string } | null>(null); // Track hovered slot

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

  // Convert dates to YYYY-MM-DD to avoid time zone issues
  const formatDateToYMD = (date: Date) => {
    // Convert the date to UTC format (YYYY-MM-DD)
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
  };

  const handleSetUnavailable = async (day: Date, time: string) => {
    const startTime24h = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format
    const formattedDate = formatDateToYMD(day); // Format day to YYYY-MM-DD in UTC

    // API call to mark as unavailable in the database
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutor_id: 1, // Replace with actual tutor ID
          available_date: formattedDate, // Send the exact date of the time slot in UTC
          available_start_time: startTime24h, // Send in HH:MM:SS format
          status: "unavailable",
        }),
      });

      if (response.ok) {
        setAvailability(prev => [
          ...prev,
          { tutor_id: 1, available_date: formattedDate, available_start_time: startTime24h, status: "unavailable" },
        ]);
      }
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  };

  // Fetch availability for the current week
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetch('/api/availability', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setAvailability(data.availabilities || []);
        } else {
          console.error("Error fetching availability:", data.message);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [value]); // Fetch whenever the selected date changes

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
            <Calendar onChange={onChange} value={value} className="rounded-lg shadow-md" />
          </div>
        </div>

        {/* Timetable */}
        <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointments for {selectedDate.toLocaleDateString()}</h2>
          <div className="grid grid-cols-8 gap-0">
            <div></div>
            {weekDays.map((dayObj, index) => (
              <div
                key={index}
                className={`text-center font-semibold p-2 ${selectedDate.getDate() === dayObj.dayNumber ? "bg-[#4B0082] text-white" : "bg-[#D3D3FF]"}`}
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
                  const isUnavailable = availability.some(
                    (slot) =>
                      formatDateToYMD(new Date(slot.available_date)) === formatDateToYMD(dayObj.fullDate) && // Match only the date in YYYY-MM-DD format
                      slot.available_start_time === time12ToDbTime[time]
                  );

                  const isFreeSlot = !isUnavailable;

                  return (
                    <div
                      key={dayIndex}
                      className={`border border-gray-300 p-6 flex justify-center items-center ${
                        selectedDate.getDate() === dayObj.dayNumber ? "bg-blue-100" : isUnavailable ? "bg-red-300" : "bg-green-200"
                      } hover:opacity-50`}
                      onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.fullDate, time })}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      {isUnavailable ? (
                        <div><p>Unavailable</p></div>
                      ) : hoveredSlot?.day.getTime() === dayObj.fullDate.getTime() && hoveredSlot?.time === time ? (
                        <div>
                          <button className="btn btn-primary text-xs opacity-1" onClick={() => handleSetUnavailable(dayObj.fullDate, time)}>
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
