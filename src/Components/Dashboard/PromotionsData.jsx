import React, { useState } from "react";
import { deletePromotionData, getPromotions, postPromotion } from "../../MainServices/getPromotions";
import { AiOutlineDelete } from "react-icons/ai";

export const PromotionsDataDiv = ({ PromotionsData }) => {
	const [promotions, setPromotions] = useState(PromotionsData)
	const [text, setText] = useState("");
	const onChange = (e) => {
		setText(e);
	};

	const submitBtn = async () => {
        const data = {
            img: text
          };          
        await postPromotion(data);
		PromotionsData = await getPromotions();
		setPromotions(PromotionsData)
	};
	const deletePromo = async(id)=>{
		await deletePromotionData(id)
		setPromotions((PromotionsData) => PromotionsData.filter((ad) => ad.id !== id))
	}
	return (
		<>
			<div className="m-auto w-fit relative">
				<div className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></div>
				<h3 className="dark:text-white text-center text-xl my-3">
					Add New Promotion
				</h3>
				<input
					name="AdInput"
					onChange={(e) => onChange(e.target.value)}
					type="text"
					className="w-80 bg-transparent dark:bg-slate-900 mt-1 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500 dark:text-white"
					placeholder="Insert Img Link Here"
				/>
				<button
					type="button"
					className="m-auto btn w-full"
					onClick={submitBtn}
				>
					Add
				</button>
			</div>
			<table className="w-full relative text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
				<span className="hidden dark:block absolute mainGradient top-48 left-48 w-44	h-44"></span>
				<caption className="caption-top my-3 text-xl">
					Table 6 : Promotions of Elite States ({" "}
					<span className="text-red-500">
						{promotions.length}
					</span>{" "}
					Promotions )
				</caption>
				<thead>
					<tr className="bg-gray-400">
						<th className="border border-slate-300">ID</th>
						<th className="border border-slate-300">Image</th>
						<th className="border border-slate-300">Delete</th>
					</tr>
				</thead>
				<tbody>
					{promotions.map((ad, index) => (
						<tr key={index}>
							<td className="border border-slate-300">{ad.id}</td>
							<td className="border border-slate-300">
								<img
									src={ad.img}
									className="adsImg"
									alt="adsImg"
								/>
							</td>
							<td className="border border-slate-300"><AiOutlineDelete onClick={() => deletePromo(ad.id)} className="text-red-500 m-auto hover:text-red-700" /></td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
