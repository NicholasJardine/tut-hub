"use client"
import ArrowRight from "@/assets/arrow-right.svg"
import Logo from '@/assets/tut.png'
import MenuIcon from '@/assets/menu.svg'

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faUniversity, faGraduationCap, faSchool, faChalkboardTeacher, faChartLine, faCalendarAlt, faGlobe, faLaptopHouse, faLock, faBookOpen, faUserGraduate, faCalendarCheck, faLightbulb, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter} from "next/navigation";
//  const router = useRouter();

 const handleRedirect = () => {
    // const router = useRouter();
        window.location.href = '/profile';

    // router.push('/profile');  // Redirect after successful profile update
  };
export const NavTwo = () => {

  return (<header className=" bg-[#d3d3ff] sticky top-0 backdrop-blur-sm z-20">
      <div className="py-1">
        <div className="container">
    
        <div className="flex items-center justify-between">
        <Image src={Logo} alt = 'logo' height={60} width={60}/>
        <nav hidden className="md:flex gap-6 text-[#4A4A4A] items-center">
        <a href="#"> <FontAwesomeIcon icon={faHome} className="h-5 w-5 mr-2" />Home</a>
          <a href="#"> About</a>
          <a href="#">Careers</a>
          <a href="#">Testimonials</a>
          <a href="/dashboard">Dashboard</a>
          {/* <a href="#">Updates</a>
          <a href="#">About</a> */}
          <button className="bg-[#4B0082] text-white px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight" onClick={handleRedirect}> Edit profile  </button>
          {/* <button className="bg-[#4B0082] text-white px-4 py-2 rounded-[20px] font-medium inline-flex items-center justify-center tracking-tight"><FontAwesomeIcon className="mr-2 mt-[-2px]" icon={faBookOpen} height={16}/> Find a tutor  </button> */}
    
    
        </nav>
        <MenuIcon className= "h-5 w-5 md:hidden"/>
        </div>
        </div>
    
    
      </div>
      </header> );
};
