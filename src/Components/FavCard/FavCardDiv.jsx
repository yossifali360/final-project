import React, { useRef } from "react";
import "./FavCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { TiDeleteOutline } from "react-icons/ti";
import { removeItem } from "../../rtc/slices/FavCartSlice";
import { useDispatch } from "react-redux";

export const FavCardDiv = ({ cartItem, first }) => {
	const dispatch = useDispatch();
	const DeleteItem = (itemId) => {
		dispatch(removeItem(itemId));
	};
	console.log("aaa");
	console.log(first);
	let whatsLink = `https://api.whatsapp.com/send?phone=201062697154&text=Hello,%20I%20am%20interested%20in%20${cartItem.header}(Id :${cartItem.id})`;
	console.log(cartItem);
	return cartItem ? (
		<div
			ref={first}
			className="flex relative flex-col bg-gray-100 m-2 rounded-lg pb-3 my-5"
			key={cartItem.id}
		>
			<img
				src={cartItem.MainImg}
				className="favItemImg h-28 rounded-lg"
				alt="CartImg"
			/>
			<span className="FavCardDivClose">
				<TiDeleteOutline
					onClick={() => DeleteItem(cartItem.id)}
					className="mx-2 text-2xl hover:text-red-500 absolute top-1 right-0"
				/>
			</span>

			<div className="info flex flex-col gap-4 mt-5 mx-2">
				<span>{cartItem.header}</span>
				<div className="">
					<a
						href={whatsLink}
						target="_Blank"
						className="flex justify-center items-center px-3 w-full py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800"
					>
						WhatsApp{" "}
						<FontAwesomeIcon className="ml-3" icon={faWhatsapp} />
					</a>
				</div>
			</div>
		</div>
	) : null;
};
