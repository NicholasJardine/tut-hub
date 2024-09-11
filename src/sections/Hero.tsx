
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




// "use client";
// import ArrowIcon from '@/assets/arrow-right.svg';
// import tutoringImage from '@/assets/tutoring.jpg';

// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import { ReactTyped, Typed } from 'react-typed';
// // import {Typed as ReactTyped} from 'react-typed';

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
//               className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10 glow-effect" // Added the glow-effect class here
//               style={{ translateY }}
//             />


//           </div>
//           <ReactTyped
//                  strings={['Hello world!', 'Welcome to my app!', 'Enjoy your stay!']}
//                  typeSpeed={90}
//                  backSpeed={50}
//                  loop
//       />
//         </div>
//       </div>
//     </section>
//   );
// };



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




// "use client";
// import ArrowIcon from '@/assets/arrow-right.svg';
// import tutoringImage from '@/assets/tutoring.jpg';

// import Image from 'next/image';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';
// import { ReactTyped, Typed } from 'react-typed';

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

//           {/* Image section */}
//           <div className="mt-20 md:mt-0 md:h-[424px] md:flex-1 relative">
//             <motion.img
//               src={tutoringImage.src}
//               alt="tutoring"
//               className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10 glow-effect"
//               style={{ translateY }}
//             />
//           </div>
//         </div>

//         {/* ReactTyped component placed under the image */}
//         <div className="mt-10 text-center">
//           <ReactTyped
//             strings={['Hello world!', 'Welcome to my app!', 'Enjoy your stay!']}
//             typeSpeed={90}
//             backSpeed={50}
//             loop
//           />
//         </div>
//       </div>
//     </section>
//   );
// };





"use client";
import ArrowIcon from '@/assets/arrow-right.svg';
import tutoringImage from '@/assets/tutoring.jpg';
import starImage from '@/assets/stars-5.png';
import starImage2 from '@/assets/stars7.png';

import bubbleImage from '@/assets/bubbles.png';
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

  // Subtle movement for the stars with a different positioning
  const starMovement = {
    y: [-220, 32], // Move slightly up and down
    x: [-5, 5],   // Move slightly left and right
    transition: {
      duration: 7, // Speed of animation
      ease: "easeInOut",
      repeat: 0, // Loop the animation // Corrected to use literal type
    },
  };

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[#d3d3ff] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px] md:mr-16 relative">
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

            {/* Stars at top-left corner of the title */}
            <motion.img
              src={starImage.src}
              alt="stars"
              width={100}
              height={100}
              className="absolute -top-10 -left-10 rotate-[30deg]" // Positioned at the top-left of the title
              animate={starMovement} // Subtle movement animation
            />

            {/* Stars at bottom-right corner of the title */}
            <motion.img
              src={starImage2.src}
              alt="stars"
              width={100}
              height={80}
              className="absolute top-12 right-[0px] rotate-[-30deg]" // Positioned at the bottom-right of the title
              animate={starMovement} // Subtle movement animation
            />
          </div>

          {/* Image section */}
          <div className="relative mt-20 md:mt-0 md:h-[424px] md:flex-1">
            <motion.img
              src={tutoringImage.src}
              alt="tutoring"
              className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10 glow-effect"
              style={{ translateY }}
            />

            {/* Bubbles for decoration */}
            {/* <motion.img
              src={bubbleImage.src}
              alt="bubbles"
              width={120}
              className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"
              style={{ translateY, rotate: 30 }}
            /> */}
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
// import { ReactTyped, Typed } from 'react-typed';

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

//           {/* Image section with Typed positioned at the bottom */}
//           <div className="mt-20 md:mt-0 md:h-[424px] md:flex-1 relative">
//             <motion.img
//               src={tutoringImage.src}
//               alt="tutoring"
//               className="md:absolute md:max-h-[316px] md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0 rounded-lg shadow-lg mt-32 md:mt-10 md:ml-10 glow-effect"
//               style={{ translateY }}
//             />

//             {/* Positioning ReactTyped at the bottom of the image */}
//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 text-center">
//               <ReactTyped
//                 strings={['We push our students to be their best', 'Start learning with us today', 'tut-hub brightens your future!']}
//                 typeSpeed={90}
//                 backSpeed={50}
//                 loop
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
