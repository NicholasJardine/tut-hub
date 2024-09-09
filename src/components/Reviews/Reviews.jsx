"use client";

import React, { useRef } from 'react'
import './Reviews.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import user_1 from '../../assets/user-1.png'
import user_2 from '../../assets/user-2.png'
import user_3 from '../../assets/user-3.png'
import user_4 from '../../assets/user-4.png'

const Reviews = () => {

const slider = useRef();
let tx = 0;

const slideForward = ()=>{
    if(tx>-50){
        tx -=25;
    }
    slider.current.style.transform = `translateX(${tx}%)`
}
const slideBackward =() => {
    if(tx<0){
        tx +=25;
    }
    slider.current.style.transform = `translateX(${tx}%)`

}


  return (
    <div className='reviews'>
      <img className = 'next' src={next_icon} alt="" onClick={slideForward}/>
      <img className = 'back' src={back_icon} alt="" onClick={slideBackward}/>
      <div className='slider'>
        <ul ref={slider}>
            <li>
                <div className='slide'>
                    <div className='project'>
                        <img src={user_1} alt="" />
                        <div>
                        <h3>project 1</h3>
                        <span>Edusity USA</span>
                        </div>
                    </div>
                </div>
                <p> Website Project - "EcoShop": EcoShop is an e-commerce platform designed to promote sustainable shopping. The website offers a seamless user experience with features such as product search, secure payment gateways, and a personalized shopping cart. Built with React and Node.js, EcoShop integrates with various eco-friendly vendors to provide users with a wide range of sustainable products.</p>
            </li>

            <li>
                <div className='slide'>
                    <div className='project'>
                        <img src={user_2} alt="" />
                        <div>
                        <h3>project 2</h3>
                        <span>Edusity USA</span>
                        </div>
                    </div>
                </div>
                <p> Mobile App 1 - "FitTrack": FitTrack is a mobile fitness application that helps users monitor their workouts, track their progress, and achieve their fitness goals. The app includes features like custom workout plans, daily progress tracking, and integration with wearable devices. Built with Flutter, FitTrack is available on both iOS and Android, offering a smooth and consistent user experience across platforms.</p>
            </li>

            <li>
                <div className='slide'>
                    <div className='project'>
                        <img src={user_3} alt="" />
                       <div>
                       <h3>project 3</h3>
                       <span>Edusity USA</span>
                       </div>
                    </div>
                </div>
                <p> Mobile App 2 - "FoodieHub": FoodieHub is a mobile application that connects food lovers with the best local restaurants and food trucks. The app allows users to discover nearby eateries, view menus, place orders, and leave reviews. With a sleek interface designed using React Native, FoodieHub provides a delightful and intuitive experience for users on the go.</p>
            </li>
            <li>
                <div className='slide'>
                    <div className='project'>
                        <img src={user_4} alt="" />
                        <div>
                        <h3>project 4</h3>
                        <span>Edusity USA</span>
                        </div>
                    </div>
                </div>
                <p> Cloud Computing Project - "CloudSync": CloudSync is a scalable cloud storage solution that offers secure data storage and synchronization across multiple devices. Leveraging AWS services like S3, Lambda, and DynamoDB, CloudSync provides users with a reliable platform to store, access, and manage their data from anywhere in the world. The project emphasizes high availability, security, and seamless integration with other cloud services.</p>
            </li>
        </ul>
      </div>

    </div>
  )
}

export default Reviews
