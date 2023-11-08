import React, { useState } from "react";
import { deleteAdData, getAds, postAd } from "../../MainServices/getAds";
import { AiOutlineDelete } from "react-icons/ai";

export const AdsDataDiv = ({ AdsData }) => {
	const [ads, setAds] = useState(AdsData)
	const [text, setText] = useState("");
	const onChange = (e) => {
		setText(e);
	};

	const submitBtn = async () => {
        const data = {
            img: text
          };          
        await postAd(data);
		AdsData = await getAds();
		setAds(AdsData)
	};
	const deleteAD = async(id)=>{
		await deleteAdData(id)
		setAds((AdsData) => AdsData.filter((ad) => ad.id !== id))

	}
	return (
		<>
			<div className="m-auto w-fit">
				<h3 className="dark:text-white text-center text-xl my-3">
					Add New Ad
				</h3>
				<input
					name="AdInput"
					onChange={(e) => onChange(e.target.value)}
					type="text"
					className="w-80 bg-transparent dark:bg-slate-900 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500 dark:text-white"
					placeholder="Insert Img Link Here"
				/>
				<button type="button" className="m-auto btn w-full" onClick={submitBtn}>
					Add
				</button>
			</div>
			<table className="w-full text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
				<caption className="caption-top my-3 text-xl">
					Table 5: Ads of Elite States ({" "}
					<span className="text-red-500">{AdsData.length}</span> Ads )
				</caption>
				<thead>
					<tr className="bg-gray-400">
						<th className="border border-slate-300">ID</th>
						<th className="border border-slate-300">Image</th>
						<th className="border border-slate-300">Delete</th>
					</tr>
				</thead>
				<tbody>
					{ads.map((ad, index) => (
						<tr key={index}>
							<td className="border border-slate-300">{ad.id}</td>
							<td className="border border-slate-300">
								<img
									src={ad.img}
									className="adsImg"
									alt="adsImg"
								/>
							</td>
							<td className="border border-slate-300"><AiOutlineDelete onClick={() => deleteAD(ad.id)} className="text-red-500 m-auto hover:text-red-700" /></td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
