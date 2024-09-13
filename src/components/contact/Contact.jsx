"use client"
import React from 'react'
import '@/app/globals.css'
// import './Contact.css'
import message_icon from '@/assets/msg-icon.png'
import mail_icon from '@/assets/mail-icon.png'
import phone_icon from '@/assets/phone-icon.png'
import location_icon from '@/assets/location-icon.png'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const ContactPage = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "feea802d-ec3f-4c1c-9d24-d5c3f0d4cd1d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Email sent Successfully! We'll get back to you as soon as possible.");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className='py-1 pattern overflow-x-clip'>
          <h1 className='section-title mt-8 text-7xl text-[#4B0082]'>Want to chat?</h1>
          {/* Reduced padding */}
  <div className="contact bg-[#d3d3ff] pattern">
    <div className="mx-auto max-w-[90%] flex flex-col md:flex-row items-stretch justify-between gap-10">
      <div className="con-col basis-[48%] text-[#676767]">
        <h3 className="font-medium text-[#000F38] text-[25px] flex items-center mb-5">
          Reach us here <Image src={message_icon.src} width={120} height={120} className="ml-2 w-[35px]" alt="Message Icon" />
        </h3>
        <p className="max-w-[450px] leading-[1.3] mb-4 mt-1">
          You're welcome to contact us using the details provided below. We're here to assist with any inquiries or support you may need. Feel free to reach out, and we'll respond as soon as possible!
        </p>
        <ul>
          <li className="flex items-center my-5">
            <Image src={mail_icon.src} width={120} height={120} className="mr-2 w-[25px]" alt="Mail Icon" />
            support@rsatech.com
          </li>
          <li className="flex items-center my-5">
            <Image src={phone_icon.src} width={120} height={120} className="mr-2 w-[25px]" alt="Phone Icon" />
            +2766443839
          </li>
          <li className="flex items-center my-5">
            <Image src={location_icon.src} width={120} height={120} className="mr-2 w-[25px]" alt="Location Icon" />
            1234 Rainbow Street, Greenfields, <br />
            Johannesburg, 2000, South Africa
          </li>
        </ul>
      </div>

      <div className="con-col basis-[48%]">
        <form onSubmit={onSubmit} className='px-10'>
          <label className="block mb-2 text-[#000F38]">Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="block w-full bg-gray-100 p-4 mb-4 mt-1 border-0 outline-none resize-none"
            required
          />

          <label className="block mb-2 text-[#000F38]">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter mobile number"
            className="block w-full bg-gray-100 p-4 mb-4 mt-1 border-0 outline-none resize-none"
            required
          />

          <label className="block mb-2 text-[#000F38]">Write your message</label>
          <textarea
            name="message"
            rows="4"
            className="block w-full bg-gray-100 p-4 mb-4 mt-1 border-0 outline-none resize-none"
            required
          ></textarea>

          <button type="submit" className="btn btn-primary mt-4 mb-4">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2 mt-[-2px]"/>
            Send email
          </button>
        </form>
        <span>{result} </span>
      </div>
    </div>
  </div>
</section>

  );
};

export default ContactPage;
