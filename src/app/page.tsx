import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import Reviews from "@/components/Reviews/Reviews"
import ContactPage from "@/components/contact/Contact"
import { Footer } from "@/sections/Footer"
import { Offerings } from "@/sections/ProductShowcase";
import StudentSlider from "@/components/slider";
export default function Home() {
  return <>
  <Navbar/>
  <Hero/>
  <LogoTicker/>
  <Offerings/>

  <ContactPage/>
  <StudentSlider/>
  {/* <Reviews/> */}
  <Footer/>
  </>;
}
