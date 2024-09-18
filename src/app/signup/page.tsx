// import Head from 'next/head';
// import { Footer } from "@/sections/Footer";
// import { Navbar } from "@/sections/Navbar";
// import '/public/sign_up.css'
// const SignUp = () => {
//     return (
//                 <>

//         <Head>
//         {/* <link rel="stylesheet" href="/globals.css" /> */}
//         <link rel="stylesheet" href="/sign_up.css" />
//         </Head>
//         <div style={{ backgroundColor: 'red', padding: '20px' }}>
//   Test inline styling
// </div>
//                 <div className="custom-container" id="custom-container">
//                 <div className="form-custom-container sign-up-custom-container">
//                     <form action="#">
//                         <h1>Create Account</h1>
//                         <div className="social-custom-container">
//                             <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//                             <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//                             <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//                         </div>
//                         <span>or use your email for registration</span>
//                         <div className="infield">
//                             <input type="text" placeholder="Name" />
//                             <label></label>
//                         </div>
//                         <div className="infield">
//                             <input type="email" placeholder="Email" name="email"/>
//                             <label></label>
//                         </div>
//                         <div className="infield">
//                             <input type="password" placeholder="Password" />
//                             <label></label>
//                         </div>
//                         <button>Sign Up</button>
//                     </form>
//                 </div>
//                 <div className="form-custom-container sign-in-custom-container">
//                     <form action="#">
//                         <h1>Sign in</h1>
//                         <div className="social-custom-container">
//                             <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//                             <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//                             <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//                         </div>
//                         <span>or use your account</span>
//                         <div className="infield">
//                             <input type="email" placeholder="Email" name="email"/>
//                             <label></label>
//                         </div>
//                         <div className="infield">
//                             <input type="password" placeholder="Password" />
//                             <label></label>
//                         </div>
//                         <a href="#" className="forgot">Forgot your password?</a>
//                         <button>Sign In</button>
//                     </form>
//                 </div>
//                 <div className="overlay-custom-container" id="overlayCon">
//                     <div className="overlay">
//                         <div className="overlay-panel overlay-left">
//                             <h1>Welcome Back!</h1>
//                             <p>To keep connected with us please login with your personal info</p>
//                             <button>Sign In</button>
//                         </div>
//                         <div className="overlay-panel overlay-right">
//                             <h1>Hello, Friend!</h1>
//                             <p>Enter your personal details and start journey with us</p>
//                             <button>Sign Up</button>
//                         </div>
//                     </div>
//                     <button id="overlayBtn"></button>
//                 </div>
//             </div>                
//                 </>

//             );
//           };
          
// export default SignUp;




"use client"
import { useEffect } from 'react';
import { Footer } from "@/sections/Footer";
import { Navbar } from "@/sections/Navbar";

const SignUp = () => {
  useEffect(() => {
    // Dynamically load the sign_up.css when the SignUp component mounts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/sign_up.css';  // Make sure this path is correct
    document.head.appendChild(link);

    // Cleanup: Remove the sign_up.css when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, []);  // Empty dependency array ensures this effect only runs once on mount/unmount

  return (
    <>
      <div className="custom-container" id="custom-container">
        <div className="form-custom-container sign-up-custom-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-custom-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <div className="infield">
              <input type="text" placeholder="Name" />
              <label></label>
            </div>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" />
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" />
              <label></label>
            </div>
            <button>Sign Up</button>
          </form>
        </div>

        <div className="form-custom-container sign-in-custom-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-custom-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" />
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" />
              <label></label>
            </div>
            <a href="#" className="forgot">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>

        <div className="overlay-custom-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className='btn btn-primary'>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p className='text-white'>Enter your personal details and start your journey with us</p>
              <button>Sign Up</button>
            </div>
          </div>
          <button id="overlayBtn"></button>
        </div>
      </div>
    </>
  );
};

export default SignUp;






// import { useRouter } from 'next/router';

// export const Hero = () => {
//   const router = useRouter();

//   const handleBecomeTutor = () => {
//     router.push('/signup'); // Navigate to the sign-up screen
//   };

//   return (
//     <section className="hero-section">
//       {/* Your hero section content */}
//       <div className="flex gap-1 items-center mt-[30px]">
//         <button
//           onClick={handleBecomeTutor}
//           className="btn btn-primary font-bold rounded-[20px] shadow-lg hover:shadow-xl flex items-center space-x-2"
//         >
//           Become a tutor
//         </button>
//         <button className="btn btn-text rounded-[20px] gap-1 shadow-lg hover:shadow-xl">
//           <span>Learn More</span>
//         </button>
//       </div>
//     </section>
//   );
// };




// import { useRouter } from 'next/router';

// const SignIn = () => {
//   const router = useRouter();

//   const handleSignIn = () => {
//     // Your sign-in logic here
//     router.push('/dashboard'); // Navigate to the dashboard after sign-in
//   };

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <button onClick={handleSignIn}>Sign In</button>
//     </div>
//   );
// };

// export default SignIn;