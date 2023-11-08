import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay , Pagination} from 'swiper/modules';
export const OurPartners = () => {
  return (
    <>
     <h3 className="text-center text-black dark:text-white text-4xl font-semibold mt-8 p-3">Our Partners</h3>
     <div className="line bg-black after:bg-black before:bg-black dark:bg-white dark:after:bg-white dark:before:bg-white"></div>
     <Swiper
    className='mb-8 p-8 pb-11'
    modules={[Autoplay]}
    spaceBetween={50}
    slidesPerView={5}
    loop={true}
    autoplay={{
      delay: 3000,
    }}
  >
    
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<img
							src="https://t4.ftcdn.net/jpg/04/33/01/07/360_F_433010773_uM4nzpaRYXuwrZPGoasgXX75fTCS1vYl.jpg"
							className="w-full PartnerImg rounded-md"
							alt="img"
						/>
					</SwiperSlide>
  </Swiper>
    </>
  )
}
