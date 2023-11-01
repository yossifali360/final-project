import React, { useEffect, useState } from "react";
import "./Posts.css";
import { AiOutlineDelete } from "react-icons/ai";

import { PostDiv } from "../Post/PostDiv";
import { getPosts, postData } from "../../MainServices/getPosts";
import { Formik, Form, Field, FieldArray } from "formik";
import { PostsSchema } from "../../Schemas/PostsSchema";
import { Promotion } from "../Promotions/Promotion";
import { Ads } from "../Ads/Ads";

const initialValues = {
	header: "",
	text: "",
	images: [],
};
export const Posts = ({notify}) => {
	const [posts, setposts] = useState([]);
	useEffect(() => {
		const waitForData = async () => setposts(await getPosts());
		waitForData();
	}, []);
	async function handlePostSubmit(values) {
		const data = await postData(values);
		const waitForData = async () => setposts(await getPosts());
		notify(`Your Post Added Successfuly `,"Success")
		waitForData();
	}
	return (
		<div className="container m-auto flex">
			<div className="w-3/12 px-5 sticky top-20 h-fit hidden md:block">
				<h3 className="text-center uppercase text-2xl my-5 dark:text-white">
					Our Latest Promotions
				</h3>
				<div className="line mb-5 bg-black dark:bg-white after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white"></div>
				<Promotion />
			</div>
			<div className="addNewPost w-full md:w-6/12  dark:bg-gray-900">
				<div className="addPhoto m-auto px-3 bg-gray-100 dark:bg-slate-900 py-1">
					<Formik
						validationSchema={PostsSchema}
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
							return (
								<Form
									onSubmit={handleSubmit}
									className="bg-white my-5  flex items-center justify-center dark:bg-slate-800 border dark:border-gray-700 flex-col w-full shadow-md px-6 rounded-xl"
								>
									<h3 className="font-bold text-2xl text-center my-3 dark:text-gray-300">
										Add Your Post
									</h3>
									<div className="mb-5 w-full">
										<input
											name="header"
											value={values.header}
											onChange={handleChange}
											onBlur={handleBlur}
											type="text"
											className="bg-transparent dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    						focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
											placeholder="Insert Header Here"
										/>
										{errors.header && touched.header && (
											<div className="text-red-500 text-center">
												{errors.header}
											</div>
										)}
									</div>
									<textarea
										name="text"
										value={values.text}
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-transparent dark:bg-slate-900 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 dark:border-gray-700 focus:ring-sky-500"
										id="postText"
										cols="30"
										rows="10"
										placeholder="Insert Full Text Here to Sell By Us !"
									></textarea>
									{errors.text && touched.text && (
										<div className="text-red-500">
											{errors.text}
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
																	(
																		friend,
																		index
																	) => (
																		<div
																			className="flex items-center"
																			key={
																				index
																			}
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
																arrayHelpers.push(
																	""
																)
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
									<button
										type="submit"
										className="btn w-full"
									>
										Post
									</button>
								</Form>
							);
						}}
					</Formik>
					{posts.map((item) => {
						return (
							<PostDiv
								header={item.header}
								text={item.text}
								id={item.id}
								images={item.images}
								key={item.id}
							/>
						);
					})}
				</div>
			</div>
			<div className="w-3/12 px-5 sticky top-20 h-fit hidden md:block">
				<h3 className="text-center uppercase text-2xl my-5 dark:text-white">
					{" "}
					Our Patrners <br /> Ads{" "}
				</h3>
				<div className="line mb-5 bg-black dark:bg-white after:bg-black before:bg-black dark:after:bg-white dark:before:bg-white"></div>
				<Ads />
			</div>
		</div>
	);
};
