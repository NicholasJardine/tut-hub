import React from 'react';
import dash from "@/assets/dashboard-1.png";
import mobileImage from "@/assets/mobile.png";

import Image from 'next/image';

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4 mt-10">
        <div className="my-row flex flex-wrap items-center gap-16">
          <div className="flex flex-col flex-1 text-left items-start">
            <h1 className="text-4xl font-bold mb-4 section-title text-left">Connecting students with the perfect tutor</h1>
            <p className="text-lg mb-6">
              At Tut-hub, we believe that the right connection between students and tutors can unlock true academic potential.
              Our platform makes personalized
              education accessible and convenient. Whether you're a student looking for tailored support or a tutor eager to grow your
              business, Tut-hub bridges the gap to create meaningful learning experiences.
            </p>
            <div className="flex gap-6">
                <div className="flex flex-col">
                <p className='tag-2'>Why tutor with us?</p>
                <ul className="list-disc pl-5 space-y-4 text-gray-700 mt-4">
  <li>
    <strong className="text-indigo-600 font-semibold">Grow Your Business</strong>
  </li>
  <li>
    <strong className="text-indigo-600 font-semibold">Manage Your Schedule</strong>
  </li>
  <li>
    <strong className="text-indigo-600 font-semibold">Online Convenience</strong>
  </li>
  <li>
    <strong className="text-indigo-600 font-semibold">Secure Payments</strong>
  </li>
</ul>

                </div>
                <div className="flex flex-col">
                <p className='tag-2'>Why choose tut hub?</p>
                <ul className="list-disc pl-5 space-y-4 text-gray-700 mt-4">
  <li>
    <strong className="text-indigo-600 font-semibold">Convenient Online Learning</strong>
  </li>
  <li>
    <strong className="text-indigo-600 font-semibold">Easy Booking and Payments</strong>
  </li>
  <li>
    <strong className="text-indigo-600 font-semibold">Expert Tutors</strong>
  </li>
</ul>

                </div>
            </div>
            {/* <button className='btn-primary w-[180px]'>Get started</button> */}
          </div>
          

          <div className="flex flex-col flex-1">
            <Image 
              src={dash.src} 
              alt="dash" 
              layout="responsive" 
              width={1300} // This width and height ratio maintains a responsive aspect
              height={1200} 
            />
            <Image 
              src={mobileImage.src} 
              alt="dash" 
              layout="responsive" 
              width={100} // This width and height ratio maintains a responsive aspect
              height={50} 
            />

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

