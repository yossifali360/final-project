import React from 'react'
import './AuctionDiv.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay,Navigation, Pagination} from 'swiper/modules';
import 'swiper/css/bundle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



export const AuctionDiv = ({header,text,images,id}) => {
  let whatsLink = `https://api.whatsapp.com/send?phone=201062697154&text=Hello,%20I%20am%20interested%20in%20${header}(Id :${id})`
  return (
    <div className="post p-6 my-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{header}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
    <div className="postImages flex overflow-x-auto gap-5 my-5">
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000,
      }}
    >
          {images.map((img,index)=>{
       return <SwiperSlide key={index}><img src={img} className='w-full' alt="img" key={index} /></SwiperSlide>
    })}
      
    </Swiper>
    </div>
    <div className="flex items-center justify-center gap-3">
      <Link to={`/SingleAuctions?id=${id}`} className="flex justify-center items-center px-3 w-1/2 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Go To Auction
      </Link>
      <a href="#" className="flex justify-center items-center px-3 py-2 text-sm w-1/2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Email <FontAwesomeIcon className='ml-3' icon={faEnvelope} />
      </a>
    </div>
    </div>
  )
}
