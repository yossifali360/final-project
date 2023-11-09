import React, { useState, useEffect } from "react";
import { getUsersAuctions } from "../../MainServices/authentication";

export const AuctionsHistory = ({ SessionData }) => {
	const [data, setData] = useState([]);
	const UserId = SessionData.userData.id;

	useEffect(() => {
		const fetchData = async () => {
			const auctionsData = await getUsersAuctions(UserId);
			setData(auctionsData);
		};

		fetchData();
	}, [UserId]);
	return (
		<div className="h-96 my-28">
			{data.length == 0 ? <h3 className="text-black text-center dark:text-white text-2xl">No Auctions History</h3> : (
				<table className="my-11 w-full relative text-center border-separate border border-slate-400 text-black dark:text-white">
					<span className="hidden dark:block absolute mainGradient -top-24 left-0 w-44	h-44"></span>
					<span className="hidden dark:block absolute mainGradient top-1/2 left-1/2 w-44	h-44"></span>
					<span className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></span>
					<caption className="caption-top my-3 text-xl">
						Auctions History
					</caption>
					<thead>
						<tr className="bg-gray-400">
							<th className="border border-slate-300">Title</th>
							<th className="border border-slate-300">
								Your Price
							</th>
							<th className="border border-slate-300">
								EnterPrice
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-slate-300">
								{data.title}
							</td>
							<td className="border border-slate-300">
								{data.HisPrice}
							</td>
							<td className="border border-slate-300">
								{data.EnterPrice}
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
};
