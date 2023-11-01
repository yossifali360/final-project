import React, { useEffect, useState } from "react";
import "./AllAuctions.css";
import { AiOutlineDelete } from "react-icons/ai";

import { PostDiv } from "../Post/PostDiv";
import { getPosts, postData } from "../../MainServices/getPosts";
import { Formik, Form, Field, FieldArray } from "formik";
import { PostsSchema } from "../../Schemas/PostsSchema";
import { Promotion } from "../Promotions/Promotion";
import { Ads } from "../Ads/Ads";
import { getAuctions } from "../../MainServices/getAuctions";
import { AuctionDiv } from "../AuctionDiv/AuctionDiv";

const initialValues = {
	header: "",
	text: "",
	images: [],
};
export const AllAuctions = ({notify}) => {
	const [Auctions, setAuctions] = useState([]);
	useEffect(() => {
		const waitForData = async () => setAuctions(await getAuctions());
		waitForData();
	}, []);
	return (
		<div className="container m-auto flex">
			<div className="w-3/12 px-5 sticky top-20 h-fit hidden md:block">
				<h3 className="text-center uppercase text-2xl my-5 dark:text-white">
					Our Latest Promotions
				</h3>
				<div className="line mb-5 bg-black dark:bg-white after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white"></div>
				<Promotion />
			</div>
			<div className="addNewPost w-full md:w-6/12  dark:bg-gray-900">
				<div className="addPhoto m-auto px-3 bg-gray-100 dark:bg-slate-900 py-1">
					{Auctions.map((item) => {
						return (
							<AuctionDiv
								header={item.title}
								text={item.desc}
								id={item.id}
								images={item.images}
								key={item.id}
							/>
						);
					})}
				</div>
			</div>
			<div className="w-3/12 px-5 sticky top-20 h-fit hidden md:block">
				<h3 className="text-center uppercase text-2xl my-5 dark:text-white">
					{" "}
					Our Patrners <br /> Ads{" "}
				</h3>
				<div className="line mb-5 bg-black dark:bg-white after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white"></div>
				<Ads />
			</div>
		</div>
	);
};
