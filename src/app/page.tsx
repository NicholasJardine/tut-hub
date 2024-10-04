import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import ContactPage from "@/components/contact/Contact"
import { Footer } from "@/sections/Footer"
import { Offerings } from "@/sections/ProductShowcase";
import StudentSlider from "@/components/slider";
import About from "@/sections/About";
// import { SignUp } from "./sign_up";
import Head from "next/head";
export default function Home() {
  return <>
          <Head>
        <link rel="stylesheet" href="/globals.css" />
        </Head>
  <Navbar/>
  <Hero/>
  <Offerings/>
  <About/>

  <ContactPage/>
  {/* <Reviews/> */}
  <Footer/>
  {/* <SignUp/> */}

  </>;
}
