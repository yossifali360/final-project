import React from 'react'
import './Banner.css'

export const Banner = () => {
  return (
    <div className="banner relative">
        <div className="overlay">
            <div className="bannerText flex justify-center items-center h-full flex-col">
                <p className='text-white text-md font-thin font-sans mb-4'>Find Your Dream House</p>
                <div className="line bg-white before:bg-white after:bg-white"></div>
                <h2 className='text-3xl md:text-6xl text-white max-w-1/2 text-center'>The Best Way To Find Your Perfect Home</h2>
            </div>
        </div>
    </div>
  )
}
