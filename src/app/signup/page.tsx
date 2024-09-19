"use client"
import { useEffect } from 'react';
import { useState } from 'react'; 
import Script from 'next/script';



const SignUp = () => {

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    user_password: '',
  });
  
  const [message, setMessage] = useState('');
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData); 
  };

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
      const response = await fetch('/api/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          user_password: formData.user_password
        }),
        credentials: 'include'
      });
      const result = await response.json();

      if(response.ok){
        // localStorage.setItem('token', result.token);
        setMessage('Login successful');
      } else {
        setMessage(result.message || 'Login Failed');
      }
    } catch(error) {
      console.error('error logging in:', error);
      setMessage('An error occurred');
    }
  };


  const handleSubmit = async( e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try{
      const response = await fetch('/api/tutors',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok){
        setMessage(result.message);
      }else{
        setMessage(result.message || 'Something went wrong');
      }
    }catch(error){
      console.error('Error submitting the form:', error);
      setMessage('An error occured');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-custom-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <div className="infield">
              <input type="text" placeholder="Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required />
              <label></label>
            </div>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" 
              value={formData.email}
              onChange={handleChange}
              required/>
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" name='user_password'
              value={formData.user_password}
              onChange={handleChange}
              required/>
              <label></label>
            </div>
            <button type='submit'>Sign Up</button>
            {message && <p>{message}</p>}

          </form>
        </div>

        <div className="form-custom-container sign-in-custom-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="social-custom-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <div className="infield">
              <input type="email" placeholder="Email" name="email" 
              value={formData.email}
              onChange={handleChange}
              required/>
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" 
              name='user_password'
              value={formData.user_password}
              onChange={handleChange}
              required/>
              <label></label>
            </div>
            <a href="#" className="forgot">Forgot your password?</a>
            <button type='submit' >Sign In</button>
            {message && <p>{message}</p>}
          </form>
        </div>

        <div className="overlay-custom-container" id="overlayCon">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='whitespace-nowrap'>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button>Sign Up</button>
            </div>
          </div>
          <button id="overlayBtn"></button>
        </div>
      </div>
      <Script id="toggle-script" strategy="lazyOnload">
        {`
          const container = document.getElementById('custom-container');
          const overlayBtn = document.getElementById('overlayBtn');
          
          if (overlayBtn) {
            overlayBtn.addEventListener('click', () => {
              container.classList.toggle('right-panel-active');
            });
          }
        `}
      </Script>
    </>
  );
};

export default SignUp;