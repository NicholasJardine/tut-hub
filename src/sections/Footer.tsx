import logo from '@/assets/tut.png'
import SocialX from '@/assets/social-x.svg'
import SocialInsta from '@/assets/social-insta.svg'
import SocialLinkedIn from '@/assets/social-linkedin.svg'
import SocialPin from '@/assets/social-pin.svg'
import SocialYoutube from '@/assets/social-youtube.svg'


import Image from 'next/image';
export const Footer = () => {
  return (
    <footer className='bg-[#4B0082] text-[#BCBCBC] text-sm py-10 lg:py-5 text-center'>
      <div className="container">
        <nav className='flex flex-col md:flex-row md:justify-center gap-6 mt-6'>
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className='flex justify-center gap-6 mt-6'>
        <Image className="relative rounded-[12px]" src={logo} alt='logo' height={26}/>
        <SocialX/>
        <SocialInsta/>
        <SocialLinkedIn/>
        <SocialPin/>
        {/* <SocialYoutube/> */}
        </div>
        <p className='mt-6'>&copy; 2024 tut-hub, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};
