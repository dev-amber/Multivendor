import React from 'react'
import logo from "../../assets/images/logo.svg";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from '../../static/data';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-[#000] text-[#fff] '>
        <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ace] py-2'>
         <h1 className='lg:text-[4xl] text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5'>
          <span className='text-[#45d879]'>
            Subscribe
          </span> us for get news <br/>
          events and offers
         </h1>
         <div>
            <input type='text'
             placeholder='Enter your email...'  required
             className='text-gray-800 sm:w-72 sm:mr-5 mr-1 lg:mb-0 mb-4 rounded px-2 focus:outline-none'
            />
            <button className='bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full'>
             Submit
            </button>
         </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-0 px-5 py-16 sm:text-center'>
          <ul className='px-5 text-center sm:text-start flex sm:block flex-col items-center'>
          <img src={logo} style={{filter: "brightness(0) invert(1)"}} alt=''/>
          <br/>
          <p>The home and elements needed to create beautiful products.</p>
          <div className='flex items-center mt-[15px]'>
           {/*icons social media */}
           <AiFillFacebook
           size={23}
           className='cursor-pointer'
           />

           <AiOutlineTwitter
           size={23}
          style={{marginLeft: "15px", cursor:"pointer"}}
           />

           <AiFillInstagram
           size={23}
           style={{marginLeft: "15px", cursor:"pointer"}}
           />

           <AiFillYoutube
           size={23}
           style={{marginLeft: "15px", cursor:"pointer"}}
           />
          </div>
          </ul>
 
          {/* display product links*/}
          <ul className='text-center sm:text-start'>
          <h1 className='mb-1 font-semibold'>Company</h1>
          {footerProductLinks.map((link)=>(
            <li key={link.name}>
              <Link  to={link.link} className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'>
                {link.name}
              </Link>
            </li>
          ))}
          </ul>


           {/*  display company links*/}
          <ul className='text-center sm:text-start'>
          <h1 className='mb-1 font-semibold'>Shop</h1>
          {footercompanyLinks.map((link)=>(
            <li key={link.name}>
              <Link  to={link.link} className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'>
                {link.name}
              </Link>
            </li>
          ))}
          </ul>

        {/* display support links*/}
          <ul className='text-center sm:text-start'>
          <h1 className='mb-1 font-semibold'>Support</h1>
          {footerSupportLinks.map((link)=>(
            <li key={link.name}>
              <Link  to={link.link} className='text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6'>
                {link.name}
              </Link>
            </li>
          ))}
          </ul>
          </div>
          
           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center text-gray-400 text-sm pb-8'>
            <span>@ 2025 Amber. All rights reserved.</span>
            <span>Terms .  Privacy Policy</span>
            <div className='sm:block flex items-center justify-center w-full'>
            <img src='https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75' alt=''/>
            </div>
            
          </div>
        </div>
  )
}

export default Footer