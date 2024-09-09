
// "use client";
// import ArrowIcon from '@/assets/arrow-right.svg'
// import tutoringImage from '@/assets/tutoring.jpg'

// import cylinderImage from '@/assets/cylinder.png'
// import noodleImage from '@/assets/noodle.png'

// import Image from 'next/image';
// import {motion, useScroll, useTransform, useMotionValueEvent} from 'framer-motion'
// import { useRef } from 'react';

// export const Hero = () => {
//   const heroRef = useRef(null);
//   const {scrollYProgress} = useScroll({
//     target: heroRef,
//     offset: ["start end", "end start"]
//   });

//   const translateY = useTransform(scrollYProgress, [0,1], [150,-150]);

//   return (

//     <section ref={heroRef} className='pt-8 pb-20 md:pt-5 md:pb-10 bg-[#d3d3ff] overflow-x-clip'>
//       <div className="container">
//         <div className='md:flex items-center'>
//         <div className='md:w-[478px] md:mr-16'> 
//         <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-[#4B0082] to-[#4B0082] text-transparent bg-clip-text mt-6">Online tutoring at your fingertips</h1>
//         <p className="text-xl text-[#4A4A4A] tracking-tight mt-6">Unlock your potential with our comprehensive tutoring platform, designed to help you achieve academic success.</p>
//         <div className="flex gap-1 items-center mt-[30px]">
//           <button className="btn btn-primary">Get for free</button>
//           <button className="btn btn-text gap-1"><span>Learn More</span> <ArrowIcon className='h-5 w-5'/></button>
//         </div>
//         </div>
//         <div className='mt-20 md:mt-0 md:h-[424px] md:flex-1 relative'>
//       <motion.img src = {tutoringImage.src} alt ='tutoring' className='md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10'

//       />
//       </div>
//       </div> 
//       </div>
//     </section>
//   );
// };




"use client";
import ArrowIcon from '@/assets/arrow-right.svg';
import tutoringImage from '@/assets/tutoring.jpg';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[#d3d3ff] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px] md:mr-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-[#4B0082] to-[#4B0082] text-transparent bg-clip-text mt-6">
              Online tutoring at your fingertips
            </h1>
            <p className="text-xl text-[#4A4A4A] tracking-tight mt-6">
              Unlock your potential with our comprehensive tutoring platform,
              designed to help you achieve academic success.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">Get for free</button>
              <button className="btn btn-text gap-1">
                <span>Learn More</span> <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[424px] md:flex-1 relative">
            <motion.img
              src={tutoringImage.src}
              alt="tutoring"
              className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10 glow-effect" // Added the glow-effect class here
              style={{ translateY }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};



// "use client";
// import ArrowIcon from '@/assets/arrow-right.svg';
// import tutoringImage from '@/assets/tutoring.jpg';

// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';

// export const Hero = () => {
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start end", "end start"],
//   });

//   const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

//   return (
//     <section
//       ref={heroRef}
//       className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[#d3d3ff] overflow-x-clip"
//     >
//       <div className="container">
//         <div className="md:flex items-center">
//           <div className="md:w-[478px] md:mr-16">
//             <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-[#4B0082] to-[#4B0082] text-transparent bg-clip-text mt-6">
//               Online tutoring at your fingertips
//             </h1>
//             <p className="text-xl text-[#4A4A4A] tracking-tight mt-6">
//               Unlock your potential with our comprehensive tutoring platform,
//               designed to help you achieve academic success.
//             </p>
//             <div className="flex gap-1 items-center mt-[30px]">
//               <button className="btn btn-primary">Get for free</button>
//               <button className="btn btn-text gap-1">
//                 <span>Learn More</span> <ArrowIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//           <div className="mt-20 md:mt-0 md:h-[424px] md:flex-1 relative">
//             <motion.img
//               src={tutoringImage.src}
//               alt="tutoring"
//               className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10"
//               style={{ translateY }}
//             />
//             {/* Overlay for the laptop screen with glowing effect */}
//             <div className="screen-glow"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
