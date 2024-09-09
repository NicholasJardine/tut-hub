"use client";
import acmeLogo from '@/assets/accounting.webp';
import quantumLogo from '@/assets/maths.webp';
import echoLego from '@/assets/science.webp';
import celestialLogo from '@/assets/bio.webp';
import pulseLogo from '@/assets/geo.webp';
import apexLego from '@/assets/history.webp';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LogoTicker = () => {
  return (
    <div className='py-8 md:py-12 bg-white'>
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div 
            className='flex gap-14 flex-none pr-14' 
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            <Image className='logo-ticker-image w-32 h-32' src={acmeLogo} alt='acme logo' /> {/* Width and height set to 128px */}
            <Image className='logo-ticker-image w-32 h-32' src={quantumLogo} alt='quantum logo' />
            <Image className='logo-ticker-image w-32 h-32' src={echoLego} alt='echo logo' />
            <Image className='logo-ticker-image w-32 h-32' src={celestialLogo} alt='celestial logo' />
            <Image className='logo-ticker-image w-32 h-32' src={pulseLogo} alt='pulse logo' />
            <Image className='logo-ticker-image w-32 h-32' src={apexLego} alt='apexL logo' />

            <Image className='logo-ticker-image w-32 h-32' src={acmeLogo} alt='acme logo' />
            <Image className='logo-ticker-image w-32 h-32' src={quantumLogo} alt='quantum logo' />
            <Image className='logo-ticker-image w-32 h-32' src={echoLego} alt='echo logo' />
            <Image className='logo-ticker-image w-32 h-32' src={celestialLogo} alt='celestial logo' />
            <Image className='logo-ticker-image w-32 h-32' src={pulseLogo} alt='pulse logo' />
            <Image className='logo-ticker-image w-32 h-32' src={apexLego} alt='apexL logo' />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
