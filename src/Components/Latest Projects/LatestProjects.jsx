import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "./LatestProjects.css";
import { getProjects } from "../../MainServices/getProjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	addItem,
	removeItem,
	updateFavCart,
} from "../../rtc/slices/FavCartSlice";

export const LatestProjects = ({ notify }) => {
	const Auth = useSelector((state) => state.authReducer.isAuth);

	// All Projects
	const [projects, setprojects] = useState([]);

	// All Fav Icons
	const [favIcons, setFavIcons] = useState([]);

	// Render All Projects
	useEffect(() => {
		const waitForData = async () => setprojects(await getProjects());
		waitForData();
		setFavIcons(Array(projects.length).fill(false));
	}, []);

	const dispatch = useDispatch();

	const toggleFavorite = (index) => {
		if (Auth) {
			const newFavIcons = [...favIcons];
			setFavIcons(newFavIcons);
			newFavIcons[index] = !newFavIcons[index];
			const selectedProject = projects[index];
			const isAlreadyInCart = cartItems.some(
				(item) => item.header === selectedProject.header
			);
			if (isAlreadyInCart) {
				dispatch(removeItem(selectedProject.id));
			} else {
				dispatch(addItem(selectedProject));
			}
		} else {
			notify(`Please Login First`, "Error");
		}
	};

	const cartItems = useSelector((state) => state.favCartReducer.favCart);
	const Hearticons = new Array(projects.length).fill(false);
	return (
		<section className="relative latestProjects">
			<div className="hidden dark:block absolute mainGradient bottom-10 right-0 w-72 h-48"></div>
			<div className="container">
				<h3 className="text-center text-black dark:text-white text-4xl font-semibold my-3">
					Our Latest Project
				</h3>
				<div className="line bg-black after:bg-black before:bg-black dark:bg-white dark:after:bg-white dark:before:bg-white"></div>
				<Swiper
					modules={[Navigation, Pagination]}
					slidesPerView={1}
					navigation
					gap={10}
					pagination={{ clickable: true }}
				>
					{projects.map((project, index) => {
						return (
							<SwiperSlide className="px-3 pt-1 mt-5" key={index}>
								<div className="p-5 h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
									{cartItems.map((item) => {
										item.header === project.header
											? (Hearticons[index] = true)
											: console.log(Hearticons);
									})}
									<img
										src="./assets/HeartCarton.png"
										className={`HeartCarton absolute ${
											Hearticons[index] == true
												? "show"
												: "hidden"
										}`}
										alt="HeartCarton"
									/>
									<iframe
										src={project.iframe}
										frameBorder="0"
										className="rounded-md w-full"
									></iframe>
									<div className="p-5">
										<a href="#">
											<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
												{project.header}
											</h5>
										</a>
										<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
											{project.text}
										</p>

										<div className="flex items-center justify-center gap-3">
											<a
												href={`https://api.whatsapp.com/send?phone=201062697154&text=Hello,%20I%20am%20interested%20in%20${project.Header}%20(Latest Projects : Id :${project.id})`}
												target="_blank"
												className="flex justify-center items-center px-3 w-1/2 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-blue-800 duration-300"
											>
												WhatsApp{" "}
												<FontAwesomeIcon
													className="ml-3"
													icon={faWhatsapp}
												/>
											</a>
											<a
												href="#"
												className="flex justify-center items-center px-3 py-2 text-sm w-1/2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 duration-300"
											>
												Email{" "}
												<FontAwesomeIcon
													className="ml-3"
													icon={faEnvelope}
												/>
											</a>
											{cartItems.map((item) => {
												item.header === project.header
													? (Hearticons[index] = true)
													: console.log(Hearticons);
											})}
											<button
												onClick={() => {
													toggleFavorite(index);
												}}
												className="flex justify-center items-center px-3 w-1/6 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-800  duration-300"
											>
												{Hearticons[index] == true ? (
													<AiFillHeart className="text-xl" />
												) : (
													<AiOutlineHeart className="text-xl" />
												)}
											</button>
										</div>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
};
