import React from "react";
import "./FavCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { TiDeleteOutline } from "react-icons/ti";
export const FavCardDiv = (cartItem) => {
    let whatsLink = `https://api.whatsapp.com/send?phone=201062697154&text=Hello,%20I%20am%20interested%20in%20${cartItem.cartItem.header}(Id :${cartItem.cartItem.id})`
    console.log(cartItem.cartItem)
	return (
        cartItem ? <div className="flex relative flex-col bg-gray-100 m-2 rounded-lg pb-3 my-5" key={cartItem.cartItem.id}>
        <img
            src={cartItem.cartItem.MainImg}
            className="favItemImg h-28 rounded-lg"
            alt="CartImg"
        />
        <TiDeleteOutline className="mx-2 text-2xl hover:text-red-500 absolute top-1 right-0" />
        <div className="info flex flex-col gap-4 mt-5 mx-2">
            <span>{cartItem.cartItem.header}</span>
            <div className="">
                <a
                    href={whatsLink}
                    target="_Blank"
                    className="flex justify-center items-center px-3 w-full py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    WhatsApp{" "}
                    <FontAwesomeIcon className="ml-3" icon={faWhatsapp} />
                </a>
            </div>
        </div>
    </div> : null
	);
};
