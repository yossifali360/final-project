import React from "react";

export const PromotionsDataDiv = ({PromotionsData}) => {
	return (
		<table className="w-full text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
			<caption className="caption-top my-3 text-xl">
				Table 6 : Promotions of Elite States ( <span className="text-red-500">{PromotionsData.length}</span> Promotions )
			</caption>
			<thead>
				<tr className="bg-gray-400">
					<th className="border border-slate-300">ID</th>
					<th className="border border-slate-300">Image</th>

				</tr>
			</thead>
			<tbody>
				{PromotionsData.map((ad, index) => (
					<tr key={index}>
						<td className="border border-slate-300">{ad.id}</td>
						<td className="border border-slate-300"><img src={ad.img} className="adsImg" alt="adsImg" /></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
