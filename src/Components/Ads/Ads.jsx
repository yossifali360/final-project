import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay , Pagination} from 'swiper/modules';
import "./Ads.css";
import { getAds } from "../../MainServices/getAds";

export const Ads = () => {
    const [adsList, setAdsList] = useState([]);
	useEffect(() => {
		const waitForData = async () => setAdsList(await getAds());
		waitForData();
	}, []);
	return (
		<Swiper
			modules={[Pagination , Autoplay]}
			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			loop={true}
			autoplay={{
				delay: 3000,
			}}
		>
			{adsList.map((item) => {
				return (
					<SwiperSlide key={item.id}>
						<img
							src={item.img}
							className="w-full AdImg"
							alt="img"
							key={item.id}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};
