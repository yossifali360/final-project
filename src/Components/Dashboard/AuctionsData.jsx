import React from "react";
import "./Dashboard.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { deleteAuctionData, getAuctions, postAuctions } from "../../MainServices/getAuctions";
import { Formik, Form, Field, FieldArray } from "formik";
import { PostsSchema } from "../../Schemas/PostsSchema";
import { AuctionsSchema } from "../../Schemas/AuctionSchema";
const initialValues = {
	title: "",
	desc: "",
	NameOfCurrentWinner: "",
	EnterPrice: "",
	CurrentPrice: "",
	images: [],
};
export const AuctionsDataDiv = ({ AuctionsData , notify }) => {
	const deletePost = async (id) => {
		await deleteAuctionData(id);
		setDbPostsData((AuctionsData) =>
			AuctionsData.filter((Auction) => Auction.id !== id)
		);
	};
	const [DbPostsData, setDbPostsData] = useState(AuctionsData);

	async function handlePostSubmit(values,{resetForm}) {
		await postAuctions(values);
		const data = await getAuctions()
		console.log(data);
		const waitForData = async () => setDbPostsData(await getAuctions());
		notify(`Your Post Added Successfuly `, "Success");
		waitForData();
		resetForm()
	}
	return (
		<>
			<Formik
				validationSchema={AuctionsSchema}
				initialValues={initialValues}
				onSubmit={handlePostSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					handleBlur,
				}) => {
					console.log(values);
					return (
						<Form
							onSubmit={handleSubmit}
							className="bg-white my-5  flex items-center justify-center dark:bg-slate-800 border dark:border-gray-700 flex-col w-full shadow-md px-6 rounded-xl"
						>
							<h3 className="font-bold text-2xl text-center my-3 dark:text-gray-300">
								Add Auction
							</h3>
							<div className="mb-5 w-full">
								<input
									name="title"
									value={values.title}
									onChange={handleChange}
									onBlur={handleBlur}
									type="text"
									className="bg-transparent dark:text-white dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
										focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
									placeholder="Insert Header Here"
								/>
								{errors.title && touched.title && (
									<div className="text-red-500 text-center">
										{errors.title}
									</div>
								)}
							</div>
							<div className="mb-5 w-full">
								<input
									name="CurrentPrice"
									value={values.CurrentPrice}
									onChange={handleChange}
									onBlur={handleBlur}
									type="text"
									className="bg-transparent dark:text-white dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
										focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
									placeholder="Insert CurrentPrice"
								/>
								{errors.CurrentPrice &&
									touched.CurrentPrice && (
										<div className="text-red-500 text-center">
											{errors.CurrentPrice}
										</div>
									)}
							</div>
							<div className="mb-5 w-full">
								<input
									name="EnterPrice"
									value={values.EnterPrice}
									onChange={handleChange}
									onBlur={handleBlur}
									type="text"
									className="bg-transparent dark:text-white dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
										focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
									placeholder="Insert EnterPrice"
								/>
								{errors.EnterPrice && touched.EnterPrice && (
									<div className="text-red-500 text-center">
										{errors.EnterPrice}
									</div>
								)}
							</div>
							<textarea
								name="desc"
								value={values.desc}
								onChange={handleChange}
								onBlur={handleBlur}
								className="bg-transparent dark:text-white dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
							focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
								id="postText"
								cols="30"
								rows="10"
								placeholder="Insert Full Text Here !"
							></textarea>
							{errors.desc && touched.desc && (
								<div className="text-red-500">
									{errors.desc}
								</div>
							)}
							<div className="w-full">
								<div>
									<FieldArray
										name="images"
										render={(arrayHelpers) => (
											<div>
												{values.images &&
												values.images.length > 0
													? values.images.map(
															(friend, index) => (
																<div
																	className="flex items-center"
																	key={index}
																>
																	<Field
																		name={`images.${index}`}
																		onChange={
																			handleChange
																		}
																		onBlur={
																			handleBlur
																		}
																		className="bg-transparent mt-1 block w-95 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
												focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
																		placeholder="Put Image Here"
																	/>
																	<button
																		type="button"
																		className="m-auto"
																		onClick={() =>
																			arrayHelpers.remove(
																				index
																			)
																		}
																	>
																		{" "}
																		<AiOutlineDelete className="text-red-500" />
																	</button>
																</div>
															)
													  )
													: null}
												<button
													className="btn m-auto block"
													type="button"
													onClick={() =>
														arrayHelpers.push("")
													}
												>
													Add Image
												</button>
												<div></div>
											</div>
										)}
									/>
								</div>
							</div>
							<button type="submit" className="btn w-full">
								Post
							</button>
						</Form>
					);
				}}
			</Formik>
			<div className="relative">
				<span className="hidden dark:block absolute mainGradient -top-24 left-0 w-44	h-44"></span>
				<span className="hidden dark:block absolute mainGradient top-1/2 left-1/2 w-44	h-44"></span>
				<span className="hidden dark:block absolute mainGradient  -bottom-8 right-0 w-72 h-44"></span>
				<table className="w-full relative text-center border-separate border border-slate-400 my-5 text-black dark:text-white">
					<caption className="caption-top my-3 text-xl">
						Table 4 : Auctions of Elite States ({" "}
						<span className="text-red-500">
							{DbPostsData.length}
						</span>{" "}
						Auctions )
					</caption>
					<thead>
						<tr className="bg-gray-400">
							<th className="border border-slate-300 w80PX">
								Image
							</th>
							<th className="border border-slate-300">Title</th>
							<th className="border border-slate-300">
								Current Price
							</th>
							<th className="border border-slate-300">
								Current Winner ID
							</th>
							<th className="border border-slate-300">
								Enter Price
							</th>
							<th className="border border-slate-300">Delete</th>
						</tr>
					</thead>
					<tbody>
						{DbPostsData.map((Auction, index) => (
							<tr key={index}>
								<td className="border border-slate-300 w80PX">
									<img
										className="dashPostImg"
										src={Auction.MainImg}
										alt="Auction Img"
									/>
								</td>
								<td className="border border-slate-300">
									{Auction.title}
								</td>
								<td className="border border-slate-300">
									{Auction.CurrentPrice.toLocaleString()} EGP
								</td>
								<td className="border border-slate-300">
									{Auction.NameOfCurrentWinner}
								</td>
								<td className="border border-slate-300">
									{Auction.EnterPrice}
								</td>
								<td className="border border-slate-300">
									<AiOutlineDelete
										onClick={() => deletePost(Auction.id)}
										className="text-red-500 m-auto hover:text-red-700"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};
