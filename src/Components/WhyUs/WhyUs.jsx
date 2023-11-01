import React from "react";
import "./WhyUs.css";

export const WhyUs = () => {
	return (
		<section className="relative my-11">
            <h3 className="text-center text-black dark:text-white text-4xl font-semibold my-3">Why Elite States ?</h3>
            <div className="line bg-black after:bg-black before:bg-black dark:bg-white dark:after:bg-white dark:before:bg-white"></div>
			<div className="hidden dark:block absolute mainGradient left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72	h-72"></div>
			<div className="whyUs">
				<div className="flex flex-col md:flex-row items-center justify-center">
					<div className="left text-black dark:text-white text-center">
						<div className="h-full flex flex-col gap-20">
							<div>
								<span className="text-3xl font-semibold numberFont">
									37
								</span>{" "}
								<br /> <span className=" text-2xl">STATES</span>{" "}
								<br /> And the District of Egypt
							</div>
							<div>
								<span className="text-3xl font-semibold numberFont">
									# 2
								</span>{" "}
								<br /> Top Mover
							</div>
						</div>
					</div>
					<div className="center">
						<img
							src="./assets/map.png"
							className="w-full h-full"
							alt="Egypt Map"
						/>
					</div>
					<div className="right text-black dark:text-white text-center">
						<div className="h-full flex flex-col gap-20">
							<div>
								<span className="text-3xl font-semibold numberFont">
									# 4 <br />
								</span>
								LARGEST
								<br /> INDEPENDENT
							</div>
							<div>
								<span className="text-3xl font-semibold numberFont">
									# 10 <br />
								</span>
								MOST
								<br /> PRODUCTIVE
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
