// "use client"
// import { useState } from 'react';
// import Calendar from 'react-calendar';

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// export default function Dashboard() {
//     const [value, onChange] = useState<Value>(new Date());

//     return (
//       <div className="Container">
//         <h1>Dashboard</h1>
//         <div className="flex justify-between">
//             <div className="flex flex-col w-[35%]">
//                 <div> Calendar here</div>
//                 <div className="max-w-[85%]">
//       <Calendar onChange={onChange} value={value}  />
//     </div>
//                 <div className="flex flex-col">
//                     <p>next appointment here</p>
//                     <div className="flex justify-between"><button>button1</button><button>button2</button></div>
//                 </div>

//             </div>
//             <div className="flex flex-col w-60">

//             </div>
//         </div>
//       </div>
//     );
//   }
"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Dashboard() {
  const [value, onChange] = useState<Value>(new Date());

  // Time slots from 8 AM to 10 PM
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", 
    "8:00 PM"
  ];

  const daysOfWeek = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col w-[35%] bg-[#D3D3FF] p-4 rounded-lg shadow-md">
          <div className="text-lg font-semibold mb-2">Your Calendar</div>
          <div className="max-w-full mb-4">
            <Calendar 
              onChange={onChange} 
              value={value} 
              className="rounded-lg shadow-md" // Add custom class for styling
            />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="font-medium text-gray-700">Next appointment:</p>
            <div className="flex justify-between space-x-2">
              <button className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Button 1</button>
              <button className="btn bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Button 2</button>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div className="flex flex-col w-[60%] bg-white p-4 rounded-lg shadow-md ">
            <div><h2>My Appointments</h2></div>
          <div className="grid grid-cols-8 gap-2">
            {/* Top Row (Days of the Week) */}
            <div></div> {/* Empty top-left corner for time */}
            {daysOfWeek.map(day => (
              <div key={day} className="text-center font-semibold bg-gray-200 p-2 rounded">{day}</div>
            ))}

            {/* Time Slots + Empty Grid Slots */}
            {timeSlots.map((time, index) => (
              <React.Fragment key={index}>
                {/* Time Column */}
                <div className="text-right pr-2 font-semibold whitespace-nowrap">{time}</div>
                
                {/* Empty slots for each day */}
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="border border-gray-300 p-2 rounded hover:bg-gray-100"></div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
