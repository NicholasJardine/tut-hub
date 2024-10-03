// "use client";
// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { useSearchParams } from 'next/navigation';

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// type Booking = {
//   id: number;
//   student_id: number;
//   tutor_id: number;
//   booking_date: string;
//   appointment_time: string;
//   status: string;
// };

// type Availability = {
//   tutor_id: number;
//   available_date: string;
//   available_start_time: string;
//   status: string;
// };

  

  



// export default function BookingScreen() {
//   const [value, onChange] = useState<Value>(new Date());
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [availability, setAvailability] = useState<Availability[]>([]);
//   const [hoveredSlot, setHoveredSlot] = useState<{ day: Date; time: string } | null>(null);

//   const searchParams = useSearchParams();
//   const tutorId = searchParams.get('tutorId');  // Get the tutorId from the URL
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const popupStyles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000,
//     },
//     popup: {
//       backgroundColor: 'white',
//       padding: '20px',
//       borderRadius: '5px',
//       textAlign: 'center',
//       opacity: 1,   // Set to 1 for fully opaque
//       zIndex: 1001, // Ensure it is above the overlay
//     },
//   };

//   const togglePopup = () => {
//     setPopupVisible(prev => !prev);
//   };

//   const timeSlots = [
//     "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
//     "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
//   ];

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

//   const formatDateToYMD = (date: Date) => {
//     return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
//   };

//   // Fetch availability and bookings for the specific tutor
//   useEffect(() => {
//     const fetchTutorData = async () => {
//       try {
//         if (tutorId) {
//           const [availabilityResponse, bookingsResponse] = await Promise.all([
//             fetch(`/api/tutor_availability?tutorId=${tutorId}`),
//             fetch(`/api/student_bookings?tutorId=${tutorId}`)
//           ]);

//           const availabilitiesData = await availabilityResponse.json();
//           const bookingsData = await bookingsResponse.json();

//           if (availabilityResponse.ok) {
//             setAvailability(availabilitiesData.availabilities || []);
//           } else {
//             console.error("Error fetching availability:", availabilitiesData.message);
//           }

//           if (bookingsResponse.ok) {
//             setBookings(bookingsData.bookings || []);
//           } else {
//             console.error("Error fetching bookings:", bookingsData.message);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching tutor data:", error);
//       }
//     };

//     fetchTutorData();
//   }, [tutorId]);

//   const selectedDate = value instanceof Date ? value : new Date();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);  // Monday as start

//   const weekDays = daysOfWeek.map((day, index) => {
//     const currentDay = new Date(startOfWeek);
//     currentDay.setDate(startOfWeek.getDate() + index);
//     return {
//       dayLabel: day,
//       dayNumber: currentDay.getDate(),
//       fullDate: currentDay,
//     };
//   });

//   const getStudentName = (studentId: number) => {
//     return <div></div>;
//     // <p className='tag-4 whitespace-nowrap'> booking {studentId} </p>
//   };

//   const handleBookingClick = async (day: Date, time: string) => {
//     const bookingDate = formatDateToYMD(day);
//     const appointmentTime = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format

//     try {
//       const response = await fetch('/api/student_bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tutor_id: tutorId,
//           booking_date: bookingDate,
//           appointment_time: appointmentTime,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // alert("Booking successful!");
//         console.log('Before toggle:', isPopupVisible);
//         togglePopup();
//         console.log('After toggle:', isPopupVisible);        // Optionally, refresh the booking data or mark the slot as booked
//       } else {
//         console.error('Booking error:', data.message);
//         alert("Booking failed: " + data.message);
//       }
//     } catch (error) {
//       console.error('Error during booking:', error);
//       alert("An error occurred during booking.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-xl font-semibold mb-4">Tutor Booking Screen</h1>
//       <div className="flex justify-between space-x-4">
//         <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
//           <div className="text-lg font-semibold mb-2">Your Calendar</div>
//           <div className="max-w-full mb-4">
//             <Calendar onChange={onChange} value={value} className="rounded-lg shadow-md" />
//           </div>
//         </div>

//         <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Appointments for {selectedDate.toLocaleDateString()}</h2>
//           <div className="grid grid-cols-8 gap-0">
//             <div></div>
//             {weekDays.map((dayObj, index) => (
//               <div key={index} className={`text-center font-semibold p-2 ${selectedDate.getDate() === dayObj.dayNumber ? "bg-[#4B0082] text-white" : "bg-[#D3D3FF]"}`}>
//                 {dayObj.dayLabel}<br />{dayObj.dayNumber}
//               </div>
//             ))}
//             <div className="grid-container">
//             <div className="scrollable-container">
//             {timeSlots.map((time, timeIndex) => (
//               <React.Fragment key={timeIndex}>
//                 <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

//                 {weekDays.map((dayObj, dayIndex) => {
// const matchingBooking = bookings.find(
//     (booking) => formatDateToYMD(new Date(booking.booking_date)) === formatDateToYMD(dayObj.fullDate) &&
//                  booking.appointment_time === time12ToDbTime[time]
//   );
//                   const isUnavailable = availability.some(
//                     (slot) => formatDateToYMD(new Date(slot.available_date)) === formatDateToYMD(dayObj.fullDate) &&
//                               slot.available_start_time === time12ToDbTime[time]
//                   );

//                   const isFreeSlot = !matchingBooking && !isUnavailable;

//                   return (
// <div
//   key={dayIndex}
//   className={`border border-gray-300 p-6 flex justify-center items-center ${
//     selectedDate.getDate() === dayObj.dayNumber
//       ? isUnavailable
//         ? "bg-gray-200"  // Slightly lighter gray for selected unavailable slots
//         : matchingBooking
//         ? "bg-amber-200" // Slightly lighter amber for selected booked slots
//         : "bg-green-100" // Slightly lighter green for selected free slots
//       : matchingBooking
//       ? "bg-gray-300"  // Amber for booked slots
//       : isUnavailable
//       ? "bg-gray-300"   // Gray for unavailable slots
//       : "bg-green-200"  // Green for free slots
//   } hover:opacity-100`}
//   onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.fullDate, time })}
//   onMouseLeave={() => setHoveredSlot(null)}
// >
//   {matchingBooking ? (
//     <div>
//       <p>{getStudentName(matchingBooking.student_id)}</p>
//     </div>
//   ) : isUnavailable ? (
//     <div></div>
//   ) : hoveredSlot?.day.getTime() === dayObj.fullDate.getTime() && hoveredSlot?.time === time ? (
//     <div>
//       <button onClick={togglePopup} className="btn btn-primary text-xs opacity-1">Book Slot</button>
//       {isPopupVisible && (
//         <div style={popupStyles.overlay as React.CSSProperties}>
//           <div style={popupStyles.popup as React.CSSProperties}>
//             <h2>Book this tutor?</h2>
//             <p className='mb-4'>Click confirm to proceed with your booking</p>
//             <div className="flex justify-between items-center"><button onClick={() => handleBookingClick(dayObj.fullDate, time)} className="opacity-1 w-[45%] bg-[#FA8340]  text-[#4B0082] px-4 py-2  rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight">Confirm</button>
//             <button onClick={togglePopup} className="bg-[#4B0082] text-white px-4 py-2  rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight w-[45%]">
//               Close
//             </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div><p className="text-green-700">Free</p></div>
//   )}
// </div>

//                   );
//                 })}



//                </React.Fragment>
//              ))}
//            </div>
//          </div>
//          </div>
//          </div>
//        </div>
//      </div>
//    );
// }


"use client";
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSearchParams } from 'next/navigation';
import {useRouter} from 'next/navigation';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type Booking = {
  id: number;
  student_id: number;
  tutor_id: number;
  booking_date: string;
  appointment_time: string;
  status: string;
};

type Availability = {
  tutor_id: number;
  available_date: string;
  available_start_time: string;
  status: string;
};

export default function BookingScreen() {
  const [value, onChange] = useState<Value>(new Date());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [hoveredSlot, setHoveredSlot] = useState<{ day: Date; time: string } | null>(null);
  const [tutorData, setTutorData] = useState(null); // State for storing tutor data
  const [hourlyRate, setHourlyRate] = useState<number | null>(null); // State for hourly rate

  const searchParams = useSearchParams();
  const tutorId = searchParams.get('tutorId');  // Get the tutorId from the URL
  const [isPopupVisible, setPopupVisible] = useState(false);
  const router = useRouter();

  
  const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    popup: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '5px',
      textAlign: 'center',
      opacity: 1,   // Set to 1 for fully opaque
      zIndex: 1001, // Ensure it is above the overlay
    },
  };

  const togglePopup = () => {
    setPopupVisible(prev => !prev);
  };

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const formatDateToYMD = (date: Date) => {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
  };

  // Fetch availability and bookings for the specific tutor
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        if (tutorId) {
          const [availabilityResponse, bookingsResponse] = await Promise.all([
            fetch(`/api/tutor_availability?tutorId=${tutorId}`),
            fetch(`/api/student_bookings?tutorId=${tutorId}`)
          ]);

          const availabilitiesData = await availabilityResponse.json();
          const bookingsData = await bookingsResponse.json();

          if (availabilityResponse.ok) {
            setAvailability(availabilitiesData.availabilities || []);
          } else {
            console.error("Error fetching availability:", availabilitiesData.message);
          }

          if (bookingsResponse.ok) {
            setBookings(bookingsData.bookings || []);
          } else {
            console.error("Error fetching bookings:", bookingsData.message);
          }
        }
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      }
    };

    fetchTutorData();
  }, [tutorId]);

  const selectedDate = value instanceof Date ? value : new Date();
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);  // Monday as start

  const weekDays = daysOfWeek.map((day, index) => {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + index);
    return {
      dayLabel: day,
      dayNumber: currentDay.getDate(),
      fullDate: currentDay,
    };
  });

  const getStudentName = (studentId: number) => {
    return <div></div>;
    // <p className='tag-4 whitespace-nowrap'> booking {studentId} </p>
  };

//   const handleBookingClick = async (day: Date, time: string) => {
//     const bookingDate = formatDateToYMD(day);
//     const appointmentTime = time12ToDbTime[time]; // Convert 12-hour time to 24-hour format

//     try {
//       const response = await fetch('/api/student_bookings', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tutor_id: tutorId,
//           booking_date: bookingDate,
//           appointment_time: appointmentTime,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         togglePopup();
//         router.push('/payment')
//          // Close popup after successful booking
//       } else {
//         console.error('Booking error:', data.message);
//         alert("Booking failed: " + data.message);
//       }
//     } catch (error) {
//       console.error('Error during booking:', error);
//       alert("An error occurred during booking.");
//     }
//   };

const handleSubmit = async (e: React.FormEvent, day: Date, time: string) => {
    e.preventDefault();
  
    // Format the date and time as needed
    const bookingDate = formatDateToYMD(day);  // Use 'day' like in handleBookingClick
    const appointmentTime = time12ToDbTime[time];  // Use 'time' like in handleBookingClick

    try {
      // Step 1: Create booking in the database
      const response = await fetch('/api/student_bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutor_id: tutorId,
          booking_date: bookingDate,
          appointment_time: appointmentTime,
          status: 'Pending', // Add initial status
          price: hourlyRate,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const form = document.getElementById('payfast-form') as HTMLFormElement;
        // Step 2: Proceed to PayFast
        console.log('Booking created successfully, proceeding to PayFast');
        if (form) {
          form.submit();  // Submit the PayFast form if it exists
        } else {
          console.error('Form not found');
          alert('Error: Payment form not found');
        }
      } else {
        console.error('Booking error:', data.message);
        alert('Booking failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during booking:', error);
      alert('An error occurred while creating the booking.');
    }
  };
  



  const fetchTutorDetails = async (tutorId: string | null) => {
    if (tutorId) {
      try {
        const res = await fetch(`/api/tutor_by_id?tutorId=${tutorId}`);
        const data = await res.json();
        if (res.ok) {
          setTutorData(data); // Store tutor data
          setHourlyRate(data.hourly_rate);
          console.log('Hourly Rate:', data.hourly_rate); // Add this to see if it’s fetched correctly

        //   console.log(data.tutor) // Store hourly rate
        } else {
          console.error('Error fetching tutor:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tutor:', error);
      }
    }
  };


  useEffect(() => {
    if (tutorId) {
      fetchTutorDetails(tutorId);  // <== Correctly call fetchTutorDetails here
    }
  }, [tutorId]); 


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Tutor Booking Screen</h1>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col w-[25%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-2">Your Calendar</div>
          <div className="max-w-full mb-4">
            <Calendar onChange={onChange} value={value} className="rounded-lg shadow-md" />
          </div>
        </div>

        <div className="flex flex-col w-[70%] bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointments for {selectedDate.toLocaleDateString()}</h2>
          <div className="grid grid-cols-8 gap-0 overflow-auto max-h-[77vh]"> {/* Scrollable container */}
            <div></div>
            {weekDays.map((dayObj, index) => (
              <div key={index} className={`text-center font-semibold p-2 ${selectedDate.getDate() === dayObj.dayNumber ? "bg-[#4B0082] text-white" : "bg-[#D3D3FF]"}`}>
                {dayObj.dayLabel}<br />{dayObj.dayNumber}
              </div>
            ))}

            {timeSlots.map((time, timeIndex) => (
              <React.Fragment key={timeIndex}>
                <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>

                {weekDays.map((dayObj, dayIndex) => {
                  const matchingBooking = bookings.find(
                    (booking) => formatDateToYMD(new Date(booking.booking_date)) === formatDateToYMD(dayObj.fullDate) &&
                                 booking.appointment_time === time12ToDbTime[time]
                  );
                  const isUnavailable = availability.some(
                    (slot) => formatDateToYMD(new Date(slot.available_date)) === formatDateToYMD(dayObj.fullDate) &&
                              slot.available_start_time === time12ToDbTime[time]
                  );

                  const isFreeSlot = !matchingBooking && !isUnavailable;

                  return (
                    <div
                      key={dayIndex}
                      className={`border border-gray-300 p-6 flex justify-center items-center ${
                        selectedDate.getDate() === dayObj.dayNumber
                          ? isUnavailable
                            ? "bg-gray-200"
                            : matchingBooking
                            ? "bg-amber-200"
                            : "bg-green-100"
                          : matchingBooking
                          ? "bg-gray-300"
                          : isUnavailable
                          ? "bg-gray-300"
                          : "bg-green-200"
                      } hover:opacity-100`}
                      onMouseEnter={() => isFreeSlot && setHoveredSlot({ day: dayObj.fullDate, time })}
                      onMouseLeave={() => setHoveredSlot(null)}
                    >
                      {matchingBooking ? (
                        <div>
                          <p>{getStudentName(matchingBooking.student_id)}</p>
                        </div>
                      ) : isUnavailable ? (
                        <div></div>
                      ) : hoveredSlot?.day.getTime() === dayObj.fullDate.getTime() && hoveredSlot?.time === time ? (
                        <div>
                          <button onClick={togglePopup} className="btn btn-primary text-xs opacity-1">Book Slot</button>
                          {isPopupVisible && (
                            <div style={popupStyles.overlay as React.CSSProperties}>
                              <div style={popupStyles.popup as React.CSSProperties}>
                                <h2>Book this tutor?</h2>
                                <div className="flex flex-col items-center"><div className="flex flex-col items-start mb-4">
                                <p>Date: {dayObj.fullDate.getDate()}/{dayObj.fullDate.getMonth() + 1}/{dayObj.fullDate.getFullYear()}</p>
                                <p>Time:{time} </p>
                                <p className='mb-2'>Total Amount: R{hourlyRate}</p>
                                {/* <div className="flex justify-between items-center max-w-[80%]">
                                  <button onClick={() => handleBookingClick(dayObj.fullDate, time)} className="opacity-1 w-[45%] bg-[#FA8340] text-[#4B0082] px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight">Confirm</button>
                                  <button onClick={togglePopup} className="bg-[#4B0082] text-white px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight w-[45%]">
                                    Cancel
                                  </button>
                                </div> */}

                                </div>
                                {/* <p className='mb-2'>Click confirm to proceed with your booking</p> */}

                                <div className="flex justify-between items-center max-w-[100%]">
                                  {/* <button onClick={() => handleBookingClick(dayObj.fullDate, time)} className="opacity-1 w-[45%] bg-[#FA8340] text-[#4B0082] px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight">Continue</button> */}
                                  <button onClick={togglePopup} className="bg-[#4B0082] text-white px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight w-[45%]">
                                    Cancel
                                  </button>
                                  <form id="payfast-form" action="https://sandbox.payfast.co.za/eng/process" method="POST">
                                  <input type="hidden" name="merchant_id" value={process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID} />
                                  <input type="hidden" name="merchant_key" value={process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY} />
                                  <input type="hidden" name="amount" value={hourlyRate !== null ? hourlyRate : ''} />
                                  <input type="hidden" name="item_name" value={`Tutoring Session on ${selectedDate}`} />
                                  <input type="hidden" name="return_url" value={process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL} />
                                  <input type="hidden" name="cancel_url" value={process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL} />
                                  <input type="hidden" name="notify_url" value={process.env.NEXT_PUBLIC_PAYFAST_NOTIFY_URL} />
                                  <input type="hidden" name="payment_method"/> 

  {/* Additional fields */}
                                 <input type="hidden" name="custom_str1" value={tutorId !==null ? tutorId : ''} />
                                 <input type="hidden" name="custom_str2" value={time} />

  {/* Continue button */}
                                <button type="button" className="opacity-1 w-[80%] bg-[#FA8340] text-[#4B0082] px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight" onClick={(e) => handleSubmit(e, dayObj.fullDate, time)}>
                                  Continue
                                </button>  
                              </form>
                                </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div><p className="text-green-700">Free</p></div>
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
