import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay , Pagination} from 'swiper/modules';
import { getPromotions } from "../../MainServices/getPromotions";
import "./Promotion.css";

export const Promotion = () => {
    const [promotionsList, setPromotionsList] = useState([]);
	useEffect(() => {
		const waitForData = async () => setPromotionsList(await getPromotions());
		waitForData();
	}, []);
	return (
		<Swiper
			modules={[Pagination, Autoplay]}			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			loop={true}
			autoplay={{
				delay: 3000,
			}}
		>
			{promotionsList.map((item) => {
				return (
					<SwiperSlide key={item.id}>
						<img
							src={item.img}
							className="w-full promotionImg"
							alt="img"
							key={item.id}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};
