import React from "react";

export const PaymentsDataDiv = ({PaymentsData}) => {
	return (
		<table className="w-full relative text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
				<span className="hidden dark:block absolute mainGradient -top-24 left-0 w-44	h-44"></span>
				<span className="hidden dark:block absolute mainGradient top-1/2 left-1/2 w-44	h-44"></span>
				<span className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></span>
			<caption className="caption-top my-3 text-xl">
				Table 2: Payments of Elite States ( <span className="text-red-500">{PaymentsData.length}</span> Payments )
			</caption>
			<thead>
				<tr className="bg-gray-400">
					<th className="border border-slate-300">Date</th>
					<th className="border border-slate-300">Payment Code</th>
					<th className="border border-slate-300">user</th>
					<th className="border border-slate-300">AuctionID</th>
					<th className="border border-slate-300">Current Price</th>
				</tr>
			</thead>
			<tbody>
				{PaymentsData.map((pay, index) => (
					<tr key={index}>
						<td className="border border-slate-300">{pay.date}</td>
						<td className="border border-slate-300">
							{pay.payment_id}
						</td>
						<td className="border border-slate-300">{pay.user}</td>
						<td className="border border-slate-300">{pay.AuctionID}</td>
						<td className="border border-slate-300">{pay.amount}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
