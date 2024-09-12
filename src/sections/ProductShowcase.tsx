// export const Offerings = () => {
//   return <section className='bg-[#D3D3FF] text-[#4B0082] text-sm py-10 text-center' >
//     <div className="container">
//       <div className="md:w-[478px] md:mr-16">
//       <h1 className="text-[#4B0082] text-5xl md:text-7xl">Our offerings</h1>
//       <p>Our tutors are skilled and knowledgeable across a broad range of subjects. 
//         We cover all subjects at highschool level, as well as STEM subjects at a university leve.
//          Have a one on one lesson with an expert</p>
//       </div>
//     </div>
//   </section>;
// };

// #
// BCBCBC

"use client"
import productImage from '@/assets/product-image.png'
import pyramidImage from '@/assets/pyramid.png'
import tubeImage from '@/assets/tube.png'

import Image from 'next/image';
import {motion,useScroll, useTransform} from 'framer-motion'
import { useRef } from 'react';
export const Offerings = () => {
  const sectionRef = useRef(null)
  const {scrollYProgress}=useScroll({
    target: sectionRef,
    offset:['start end','end start']
  });

  const translateY = useTransform(scrollYProgress,[0,1], [150,-150])
  return <section ref={sectionRef} className=' bg-gradient-to-b from-[#ffffff] to [#D2DCFF] py-8 overflow-x-clip pattern'>
    <div className="container">
      <div className="section-heading">

      
      <div className="flex justify-center">
      <p className='tag'>Boost your productivity</p>
      </div>
    <h2 className='section-title mt-5'>What we offer</h2>
    <p className='section-description mt-5'>
    Tut-hub provides comprehensive tutoring services at both university and high school levels, with flexible options for one-on-one or group sessions, ensuring tailored support for every student's unique needs.</p>
    </div>
    {/* <div className="relative">
    <Image src={productImage} alt='product image' className='mt-10'></Image>
    <motion.img style={{
      translateY,
    }} src={pyramidImage.src} height={262} width ={262}alt='pyramid image' className='hidden md:block absolute -right-36 -top-32'></motion.img>
    <motion.img style={{
      translateY
    }} src={tubeImage.src} height={248} width={248} alt='tube image' className='hidden md:block absolute bottom-24 -left-36'></motion.img>

    </div> */}
    </div>

  </section>;
};
