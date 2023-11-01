import React, { useEffect, useState } from "react";
import { getAuctions, getSingleAuctions } from "../../MainServices/getAuctions";
import "./SingleAuctions.css";
import { useLocation, useNavigate } from "react-router-dom";

export const SingleAuctions = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const AuctionID = searchParams.get("id");

	const [AuctionData, setAuctionData] = useState([
		{ images: ["img1", "img2"] },
	]);
	const [MainImg, setMainImg] = useState("");
	console.log(MainImg);
	useEffect(() => {
		const waitForData = async () => {
			let Data = await getSingleAuctions(AuctionID);
			setAuctionData(Data);
			setMainImg(Data.images[0]);
		};
		waitForData();
	}, []);
	let testfunc = (img) => {
		console.log(img);
		setMainImg(img);
	};
	const navigate = useNavigate();
    const SessionData = JSON.parse(localStorage.getItem('Session'));
	const handleEnterAuction = () => {
		navigate(`/CheckOut?AuctionId=${AuctionID}&UserId=${SessionData.userData.id}`);
	};

	return (
		<section className="py-12 sm:py-16">
			<div className="container mx-auto px-4">
				<div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
					<div className="lg:col-span-3 lg:row-end-1">
						<div className="lg:flex lg:items-start">
							<div className="lg:order-2 lg:ml-5">
								<div className="max-w-xl overflow-hidden rounded-lg">
									{AuctionData.images &&
									AuctionData.images.length > 1 ? (
										<img
											className="object-cover MainImg"
											src={MainImg}
											alt="MainImg"
										/>
									) : null}
								</div>
							</div>

							<div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
								<div className="flex flex-row items-start lg:flex-col">
									{AuctionData.images &&
									AuctionData.images.length > 1
										? AuctionData.images.map(
												(img, index) => (
													<button
														onClick={() =>
															testfunc(img)
														}
														key={index}
														type="button"
														className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
													>
														<img
															className="h-full w-full object-cover"
															src={img}
															alt="Auction Image"
														/>
													</button>
												)
										  )
										: null}
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
						<h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
							{AuctionData.title}
						</h1>

						<div className="mt-5 flex items-center">
							<div className="text-xl uppercase">
								Current Price :{" "}
								<span className="text-red-500">
									{AuctionData &&
									AuctionData.EnterPrice !== undefined
										? AuctionData.CurrentPrice.toLocaleString()
										: ""}
								</span>
								<span> EGP</span>
							</div>
						</div>

						<div className="mt-10 space-y-4 border-t border-b py-8">
							<div className="btns">
								<h1 className="text-xl font-bold">
									You Can Enter Auction By{" "}
								</h1>
								<span className="text-xl text-red-500">
									{AuctionData &&
									AuctionData.EnterPrice !== undefined
										? AuctionData.EnterPrice.toLocaleString()
										: ""}
								</span>
								<span> EGP</span>
							</div>

							<button
								type="button"
								onClick={handleEnterAuction}
								className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
							>
								Enter Auction
							</button>
						</div>
					</div>

					<div className="lg:col-span-3">
						<div className="border-b border-gray-300">
							<h3 className="border-b-2 border-gray-900 py-4 font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800 text-3xl">
								Description
							</h3>
						</div>

						<div className="mt-8 flow-root sm:mt-12">
							<p className="mt-4">
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Optio numquam enim facere.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
