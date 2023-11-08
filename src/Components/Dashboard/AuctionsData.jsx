import React from "react";
import "./Dashboard.css"
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { deleteAuctionData } from "../../MainServices/getAuctions";

export const AuctionsDataDiv = ({AuctionsData}) => {
    const deletePost = async (id)=>{
        await deleteAuctionData(id)
		setDbPostsData((AuctionsData) => AuctionsData.filter((Auction) => Auction.id !== id)
      );
    }
    const [DbPostsData, setDbPostsData] = useState(AuctionsData)
	return (
		<table className="w-full text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
			<caption className="caption-top my-3 text-xl">
				Table 4 : Auctions of Elite States ( <span className="text-red-500">{DbPostsData.length}</span> Auctions )
			</caption>
			<thead>
				<tr className="bg-gray-400">
					<th className="border border-slate-300 w80PX">Image</th>
					<th className="border border-slate-300">Title</th>
					<th className="border border-slate-300">Current Price</th>
					<th className="border border-slate-300">Current Winner ID</th>
					<th className="border border-slate-300">Enter Price</th>
					<th className="border border-slate-300">Delete</th>
				</tr>
			</thead>
			<tbody>
				{DbPostsData.map((Auction, index) => (
					<tr key={index}>
						<td className="border border-slate-300 w80PX"><img className="dashPostImg" src={Auction.MainImg} alt="Auction Img" /></td>
						<td className="border border-slate-300">{Auction.title}</td>
						<td className="border border-slate-300">
							{Auction.CurrentPrice.toLocaleString()} EGP
						</td>
						<td className="border border-slate-300">{Auction.NameOfCurrentWinner}</td>
						<td className="border border-slate-300">{Auction.EnterPrice}</td>
						<td className="border border-slate-300"><AiOutlineDelete onClick={() => deletePost(Auction.id)} className="text-red-500 m-auto hover:text-red-700" /></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
