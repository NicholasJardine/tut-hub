import React from 'react';
import dash from "@/assets/dashboard-1.png";
import Image from 'next/image';

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="my-row flex flex-wrap items-center gap-16">
          <div className="flex flex-col flex-1 text-left">
            <h1 className="text-4xl font-bold mb-4 section-title text-left">Connecting students with the perfect tutor</h1>
            <p className="text-lg mb-6">
              At Tut-hub, we believe that the right connection between students and tutors can unlock true academic potential.
              Our platform is designed to match students with tutors who best fit their learning style and needs, making personalized
              education accessible and convenient. Whether you're a student looking for tailored support or a tutor eager to grow your
              business, Tut-hub bridges the gap to create meaningful learning experiences.
            </p>
            <button className='btn-primary'>Get started</button>
          </div>

          <div className="flex flex-col flex-1">
            <Image 
              src={dash.src} 
              alt="dash" 
              layout="responsive" 
              width={600} // This width and height ratio maintains a responsive aspect
              height={400} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

