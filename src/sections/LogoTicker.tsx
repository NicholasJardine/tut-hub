"use client";
import acmeLogo from '@/assets/accounting.webp';
import quantumLogo from '@/assets/maths.webp';
import echoLego from '@/assets/science.webp';
import celestialLogo from '@/assets/bio.webp';
import pulseLogo from '@/assets/geo.webp';
import apexLego from '@/assets/history.webp';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const LogoTicker = () => {
  const controls = useAnimation();  // Use controls to manually control animation

  // Start the animation when the component mounts
  useEffect(() => {
    controls.start({
      translateX: "-50%",
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [controls]);  // Empty dependency array ensures this runs only once on mount

  const handleMouseEnter = async () => {
    // Pause the ticker by stopping the animation
    await controls.stop();
  };

  const handleMouseLeave = () => {
    // Resume the ticker animation
    controls.start({
      translateX: "-50%",
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  };

  return (
    <div className='py-8 md:py-12 bg-white pattern'>
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div 
            className='flex gap-14 flex-none pr-14' 
            animate={controls} // Control animation via the useAnimation hook
            initial={{ translateX: "0%" }}  // Initial position of the ticker
          >
            {/* Logos with hover functionality */}
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={acmeLogo} 
              alt='acme logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={quantumLogo} 
              alt='quantum logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={echoLego} 
              alt='echo logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={celestialLogo} 
              alt='celestial logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={pulseLogo} 
              alt='pulse logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={apexLego} 
              alt='apex logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />

            {/* Repeat logos */}
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={acmeLogo} 
              alt='acme logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={quantumLogo} 
              alt='quantum logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={echoLego} 
              alt='echo logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={celestialLogo} 
              alt='celestial logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={pulseLogo} 
              alt='pulse logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
            <Image 
              className='logo-ticker-image w-32 h-32' 
              src={apexLego} 
              alt='apex logo'
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave} 
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

