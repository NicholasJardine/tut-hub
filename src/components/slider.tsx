"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Import your images here
import student1 from "@/assets/student1.jpg";
import student2 from "@/assets/student2.jpg";
import student3 from "@/assets/student3.jpg";
import student4 from "@/assets/student4.jpg";
import student5 from "@/assets/student5.jpg";
import student6 from "@/assets/tutoring.jpg";

// Slider Component
const StudentSlider = () => {
  const students = [student1, student2, student3, student4, student5, student6];
  const [currentImage, setCurrentImage] = useState(0);

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % students.length);
    }, 5000); // Change every 5 seconds (2 seconds for fade + 3 seconds visible)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [students.length]);

  // Basic fade-in and fade-out animation
  const variants = {
    initial: { opacity: 0 }, // Start from transparent
    animate: { opacity: 1 }, // Fade in
    exit: { opacity: 0 }, // Fade out
  };

  return (
    <div className="slider-container" style={{ position: "relative", width: "100%", height: "300px", boxShadow: "0 0 20px #4B0082" }}>
      <div className="slider" style={{ position: "relative", width: "100%", height: "100%" }}>
        <AnimatePresence>
          <motion.div
            key={currentImage} // Ensure the animation happens every time the image changes
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={{ duration: 2 }} // Only apply a 2-second fade-in/fade-out
            style={{
              position: "absolute", // Keeps the images in the same spot
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={students[currentImage]} // Set the current image
              alt={`Slide ${currentImage}`}
              layout="responsive" // Ensures the image resizes properly
              width={1920} // Provide width for responsive layout
              height={1080} // Provide height for responsive layout
              objectFit="cover" // Ensure aspect ratio and coverage
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentSlider;
