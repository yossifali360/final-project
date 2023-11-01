import React from "react";
import "./Services.css";

export const Services = () => {
	return (
		<>
		<div className="bgPng absolute"></div>		
		<section className="relative">
			<div className="hidden dark:block absolute mainGradient -top-24 left-0 w-44	h-44"></div>
			<div className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></div>
			<div className="parent grid max-w-screen-lg m-auto gap-4 sm:grid-cols-1 md:grid-cols-3 relative">
				<div className="item p-5 shadow-lg bg-white dark:bg-slate-800 dark:hover:bg-emerald-500 dark:text-white hover:bg-emerald-500 transation duration-1000">
					<div className="thump dark:after:bg-slate-700 m-auto rounded-full  border-4 dark:border-0 dark:shadow-2xl border-white relative overflow-hidden">
						<div className="w-full h-full flex items-center justify-center">
							<img
								src="./assets/1.png"
								alt="1img"
								className="p-8 z-10 relative"
							/>
						</div>
					</div>
					<div className="txt">
						<h3 className="text-center text-3xl font-semibold font-sans mb-5">
							Sell Poparty
						</h3>
						<p className="text-center mb-2">
							Lorem ipsum dolor sit consectetur adipisicing elit,
							sed do eiusmod tempor incididunt ut labore.
						</p>
					</div>
				</div>
				<div className="item p-5 shadow-lg bg-white dark:bg-slate-800 dark:hover:bg-emerald-500 dark:text-white hover:bg-emerald-500 transation duration-1000">
					<div className="thump dark:after:bg-slate-700 m-auto rounded-full  border-4 dark:border-0 dark:shadow-2xl border-white relative overflow-hidden">
						<div className="w-full h-full flex items-center justify-center">
							<img
								src="./assets/2.png"
								alt="1img"
								className="p-8 z-10 relative"
							/>
						</div>
					</div>
					<div className="txt">
						<h3 className="text-center text-3xl font-semibold font-sans mb-5">
							Daily Apartment
						</h3>
						<p className="text-center mb-2">
							Lorem ipsum dolor sit consectetur adipisicing elit,
							sed do eiusmod tempor incididunt ut labore.
						</p>
					</div>
				</div>
				<div className="item p-5 shadow-lg bg-white dark:bg-slate-800 dark:hover:bg-emerald-500 dark:text-white hover:bg-emerald-500 transation duration-1000">
					<div className="thump dark:after:bg-slate-700 m-auto rounded-full  border-4 dark:border-0 dark:shadow-2xl border-white relative overflow-hidden">
						<div className="w-full h-full flex items-center justify-center">
							<img
								src="./assets/3.png"
								alt="1img"
								className="p-8 z-10 relative"
							/>
						</div>
					</div>
					<div className="txt">
						<h3 className="text-center text-3xl font-semibold font-sans mb-5">
							Family House
						</h3>
						<p className="text-center mb-2">
							Lorem ipsum dolor sit consectetur adipisicing elit,
							sed do eiusmod tempor incididunt ut labore.
						</p>
					</div>
				</div>
			</div>
		</section>
		</>
	);
};
