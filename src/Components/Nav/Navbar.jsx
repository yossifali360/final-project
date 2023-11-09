import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { BsBagHeart } from "react-icons/bs";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../rtc/slices/authSlice";
import { AiFillHeart } from "react-icons/ai";
import "../Scroll/ProgressTracker.js";
import { scroll } from "framer-motion/dom";
import { useRef } from "react";
import { FavCardDiv } from "../FavCard/FavCardDiv";
import { removeAllItems } from "../../rtc/slices/FavCartSlice";

export const Navbar = ({ notify, SessionData }) => {
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [userDropDown, setuserDropDown] = useState(false);
	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};
	const userDrop = () => {
		setuserDropDown(!userDropDown);
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Dark And Ligh Mode
	const [theme, settheme] = useState("light");

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		settheme(localStorage.getItem("theme") ?? "light");
	});

	const handleMode = () => {
		settheme(theme === "dark" ? "light" : "dark");
		localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
	};
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};
	useEffect(() => {
		const progressWheel = document.querySelector(".progress");
		scroll((progress) => {
			progressWheel.style.strokeDasharray = `${progress}, 1`;
		});
	});
	const toTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};
	const UserRef = useRef();
	const first = useRef();
	console.log(first);
	useEffect(() => {
		if (!UserRef || !UserRef.current) return;
		function closeOptions(e) {
			if (
				e.target != UserRef.current &&
				!UserRef.current.contains(e.target)
			) {
				console.log("y");
				setuserDropDown(false);
			} else {
				setuserDropDown(true);
			}
		}
		document.addEventListener("click", closeOptions);
		return () => {
			document.removeEventListener("click", closeOptions);
		};
	}, []);

	const optionsRef = useRef();
	const closeBtn = useRef();
	useEffect(() => {
		if (!optionsRef || !optionsRef.current) return;

		function closeOptions(e) {
			if (
				e.target === closeBtn.current ||
				closeBtn.current.contains(e.target) ||
				e.target.closest(".navCartIcon") ||
				e.target.closest(".FavCardDivClose")
			) {
				return;
			}
			if (
				e.target !== optionsRef.current &&
				!e.target.closest(".navCartIcon") &&
				!e.target.closest(".FavCardDivClose")
			) {
				setIsDrawerOpen(false);
			}
		}

		document.addEventListener("click", closeOptions);

		return () => {
			document.removeEventListener("click", closeOptions);
		};
	}, [optionsRef, closeBtn, setIsDrawerOpen]);

	const cartItems = useSelector((state) => state.favCartReducer.favCart);
	const handleRemoveCart = () => {
		dispatch(removeAllItems());
	};
	return (
		<div className=" z-50 sticky top-0">
			<svg
				onClick={toTop}
				className="ArrowUp cursor-pointer"
				stroke="currentColor"
				fill="none"
				strokwidth="0"
				viewBox="0 0 15 15"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z"
					fill="currentColor"
				></path>
			</svg>
			<svg
				onClick={toTop}
				width="50"
				height="50"
				viewBox="0 0 100 100"
				className="progress-wheel cursor-pointer"
			>
				<circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
				<circle
					cx="50"
					cy="50"
					r="30"
					pathLength="1"
					className="progress"
				/>
			</svg>
			<nav className="bg-white border-gray-200 dark:bg-zinc-950">
				<div className=" flex flex-wrap items-center justify-between mx-auto p-4">
					<a href="#" className="flex items-center">
						<img
							src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaAPTv_HqWt1CyNfRw2pEc3zaOZZZOarMb72r20bdRizIXaUmZTJJqmUFAnTYtO3pXCf9tRl5iQ8xMjNpoETSIa6_sIsGg=w1920-h923"
							className="h-11 mr-3"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-md md:text-2xl font-bold whitespace-nowrap dark:text-white">
							Elite{" "}
							<span className="text-emerald-500	">Estates</span>
						</span>
					</a>
					<div className="flex items-center md:order-2 relative">
						<div className="navCartIcon" ref={optionsRef}>
							<div className="CartIcon relative">
								<BsBagHeart
									className="text-2xl mx-5 dark:text-white"
									onClick={toggleDrawer}
								/>
								{isAuth &&
								cartItems &&
								cartItems.length >= 1 ? (
									<div className="CartNumber absolute bg-emerald-500 text-center w-6 h-6 rounded-full font-semibold -top-3 right-2">
										{cartItems.length}
									</div>
								) : null}
							</div>
							<div
								id="drawer-right-example"
								className={`shadow-2xl fixed top-0 right-0 z-40 w-full md:w-auto h-screen p-4 overflow-y-auto transition-transform ${
									isDrawerOpen
										? "translate-x-0"
										: "translate-x-full"
								} bg-white favCartDrawer dark:bg-gray-800`}
								tabIndex="-1"
								aria-labelledby="drawer-right-label"
							>
								<h5
									id="drawer-right-label"
									className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
								>
									<AiFillHeart className="text-xl mx-2" />
									Favourite Cart
								</h5>
								<button
									type="button"
									data-drawer-hide="drawer-right-example"
									onClick={toggleDrawer}
									ref={closeBtn}
									aria-controls="drawer-right-example"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close menu</span>
								</button>
								<div className="relative md:w-96 max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg border border-gray-400">
									<div className="px-4 py-2 border-b border-gray-200">
										<h2 className="font-semibold text-gray-800">
											Your Items
										</h2>
									</div>
									<div className="FavCart relative overflow-x-hidden overflow-y-auto">
										{cartItems && cartItems.length >= 1 ? (
											cartItems.map((ele, index) => {
												return (
													<div key={ele.id}>
														<FavCardDiv
															first={first}
															cartItem={ele}
														/>
													</div>
												);
											})
										) : (
											<h3 className="text-3xl text-gray-700 text-center top-1/3 w-full left-1/2 -translate-x-1/2 absolute">
												Your Cart Is Empty !
											</h3>
										)}
									</div>
									{/* <div className="flex flex-col divide-y divide-gray-200">
					</div> */}
									<div className="absolute bottom-0 w-full flex items-center justify-between px-6 py-5 bg-gray-200">
										<h3 className="text-gray-900 font-semibold">
											Total Items:{" "}
											{cartItems
												? cartItems.length
												: null}
										</h3>
										<button
											onClick={handleRemoveCart}
											className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
										>
											Remove All
										</button>
									</div>
								</div>
							</div>
						</div>
						<div
							ref={UserRef}
							className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button"
							aria-expanded={userDropDown}
							onClick={userDrop}
							data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom"
						>
							<span className="sr-only">Open user menu</span>
							<img
								className="w-8 h-8 rounded-full"
								src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
								alt="user photo"
							/>
							{isAuth ? (
								<div
									className={`z-50 absolute top-8 right-0 ${
										userDropDown ? "" : "hidden"
									} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
									id="user-dropdown"
								>
									<div className="px-4 py-3">
										<span className="block text-sm text-gray-900 dark:text-white">
											{SessionData.userData.name}
										</span>
										<span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
											{SessionData.userData.email}
										</span>
									</div>
									<ul
										className="py-2"
										aria-labelledby="user-menu-button"
									>
										<li>
											{console.log(
												SessionData.userData.Role
											)}
											{SessionData.userData.Role ==
											"Admin" ? (
												<Link
													to={"/Dashboard"}
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
												>
													Dashboard
												</Link>
											) : null}
										</li>
										<li>
											<Link
												to={"/Settings"}
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											>
												Settings
											</Link>
										</li>
										<li>
											{SessionData.userData.Role ==
											"Member" ? (
												<Link to={"AuctionsHistory"} className="w-full text-start block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
													Auction History
												</Link>
											) : null}
										</li>
										<li>
											<button
												onClick={() => {
													dispatch(logout());
													navigate("/")
													notify(
														`You Logout Successfuly!`,
														"Success"
													);
												}}
												className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											>
												Logout
											</button>
										</li>
									</ul>
								</div>
							) : (
								<div
									className={`z-50 absolute top-8 right-0 ${
										userDropDown ? "" : "hidden"
									} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
									id="user-dropdown"
								>
									<ul
										className="py-2"
										aria-labelledby="user-menu-button"
									>
										<li>
											<Link
												to={"/Login"}
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											>
												Login
											</Link>
										</li>
										<li>
											<NavLink
												to={"/Register"}
												href="#"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											>
												Register
											</NavLink>
										</li>
									</ul>
								</div>
							)}
						</div>
						<button
							className={` mx-5 ${
								theme == "dark" ? "text-white" : "text-black"
							} `}
							onClick={handleMode}
						>
							{theme == "dark" ? (
								<MdDarkMode />
							) : (
								<MdOutlineLightMode />
							)}
						</button>
						<button
							data-collapse-toggle="navbar-user"
							onClick={toggleCollapse}
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-user"
							aria-expanded={isCollapsed ? "true" : "false"}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
							isCollapsed ? "block" : "hidden"
						}`}
						id="navbar-user"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-zinc-950 dark:border-gray-700">
							<li>
								<link rel="stylesheet" href="" />
								<NavLink
									to={"/"}
									className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:bg-transparent md:hover:text-emerald-500 md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
									aria-current="page"
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/Posts"}
									className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-500	 md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/Auctions"}
									className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-500	 md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Auctions
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/Contact"}
									className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-emerald-500	 md:p-0 dark:text-white md:dark:hover:text-emerald-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Contact
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
