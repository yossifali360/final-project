import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleAuctions } from "../../MainServices/getAuctions";
import { Formik } from "formik";
import { CheckOutSchema } from "../../Schemas/CheckOutSchema";

const initialValues = {
    AuctionAmount : "",
	name: "",
	Address: "",
	Country: "",
	City: "",
	phoneNumber: "",
	State: "",
	zipCode : "",
};

export const CheckOut = ({notify}) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const AuctionID = searchParams.get("AuctionId");
	const [AuctionData, setAuctionData] = useState([]);

	useEffect(() => {
		const waitForData = async () => {
			let Data = await getSingleAuctions(AuctionID);
			setAuctionData(Data);
		};
		waitForData();
	}, []);

	function handleCheckOut(values,{resetForm}) {
            const Data = {...values}
            delete Data.name
            console.log(Data);
	}
	return (
		<Formik
			validationSchema={CheckOutSchema}
			initialValues={initialValues}
			onSubmit={handleCheckOut}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				handleBlur,
			}) => {
                {console.log(values);}
				return (
                    <form onSubmit={handleSubmit} className="flex justify-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44">
                    <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center  lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                        <div className="flex w-full flex-col justify-start items-start">
                            <div className="">
                                <p className="text-3xl lg:text-4xl dark:text-white font-semibold leading-7 lg:leading-9 text-gray-800">
                                    Check out
                                </p>
                            </div>
                            <div className="mt-12">
                            </div>
                            <div className="mt-8 flex flex-col justify-start items-start w-full space-y-4">
                            <input
                                    name="AuctionAmount"
                                    value={values.AuctionAmount}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                    type="text"
                                    placeholder="Your price for the auction"
                                />
                                {errors.AuctionAmount && touched.AuctionAmount && (
									<div className="text-red-500">
										{errors.AuctionAmount}
									</div>
								)}
                                <p className="text-xl font-semibold dark:text-white leading-5 text-gray-800">
                                    Your Details
                                </p>
                                <input
                                            name="name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="px-2 focus:outline-none  dark:bg-transparent dark:text-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                            type="text"
                                            placeholder="Your Name"
                                        />
                                        {errors.name && touched.name && (
                                                <div className="text-red-500">
                                                    {errors.lName}
                                                </div>
                                            )}
                                <input
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
											<div className="text-red-500">
												{errors.phoneNumber}
											</div>
										)}
                                <input
                                    name="Address"
                                    value={values.Address}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className="px-2 focus:outline-none dark:bg-transparent dark:text-gray-400 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                                    type="text"
                                    placeholder="Address"
                                />
                                {errors.Address && touched.Address && (
											<div className="text-red-500">
												{errors.Address}
											</div>
										)}
                                <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-4 sm:space-y-0 sm:space-x-8">
                                    <div className="w-full">
                                        <input
                                            name="Country"
                                            value={values.Country}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="Country"
                                        />
                                       {errors.Country && touched.Country && (
											<div className="text-red-500">
												{errors.Country}
											</div>
										)}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            name="City"
                                            value={values.City}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="City"
                                        />
                                       {errors.City && touched.City && (
											<div className="text-red-500">
												{errors.City}
											</div>
										)}
                                    </div>
                                </div>
                                <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-4 sm:space-y-0 sm:space-x-8">
                                    <div className="w-full">
                                        <input
                                            name="State"
                                            value={values.State}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="State"
                                        />
                                       {errors.State && touched.State && (
											<div className="text-red-500">
												{errors.State}
											</div>
										)}
                                    </div>
                                    <div className="w-full">
                                        <input
                                            name="zipCode"
                                            value={values.zipCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="zipCode"
                                        />
                                        {errors.zipCode && touched.zipCode && (
											<div className="text-red-500">
												{errors.zipCode}
											</div>
										)}
                                    </div>
                                </div>
                                <input
                                    className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                    type="text"
                                    placeholder="Card Number"
                                />
                                <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-4 sm:space-y-0 sm:space-x-8">
                                    <div className="w-full">
                                        <input
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="CVV"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <input
                                            className="focus:outline-none dark:text-gray-400 dark:bg-transparent dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 pt-4 pb-3 w-full"
                                            type="text"
                                            placeholder="Exp Date"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="focus:outline-none dark:bg-gray-800 dark:text-white focus:ring-emerald-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">
                                Check Out
                            </button>
                            
                        </div>
        
                        <div className=" sticky top-16 flex flex-col h-fit justify-start items-start bg-gray-50 dark:bg-gray-800 w-full p-6 md:p-14">
                            <div>
                                <h1 className="text-2xl  dark:text-white font-semibold leading-6 text-gray-800">
                                    Order Summary
                                </h1>
                            </div>
                            <div className="flex mt-7 flex-col items-end w-full space-y-6">
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg dark:text-gray-300 leading-4 text-gray-600">
                                        Auction Enter Price
                                    </p>
                                    <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                        {AuctionData &&
                                        AuctionData.EnterPrice !== undefined
                                            ? AuctionData.EnterPrice.toLocaleString()
                                            : ""}
                                    </p>
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <p className="text-lg dark:text-gray-300 leading-4 text-gray-600">
                                        Total Charges
                                    </p>
                                    <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
                                        {AuctionData &&
                                        AuctionData.EnterPrice !== undefined
                                            ? (
                                                    AuctionData.EnterPrice * 0.08
                                              ).toLocaleString()
                                            : ""}
                                    </p>
                                </div>
                                {/* <div className="flex justify-between w-full items-center">
                                        <p className="text-lg dark:text-emerald-500 leading-4 text-emerald-500">
                                            Discount
                                        </p>
                                        <p className="text-lg dark:text-emerald-500 font-semibold leading-4 text-emerald-500">
                                            0
                                        </p>
                                    </div> */}
                            </div>
                            <div className="flex justify-between w-full items-center mt-10">
                                <p className="text-xl dark:text-white font-semibold leading-4 text-gray-800">
                                    Estimated Total
                                </p>
                                <p className="text-lg dark:text-white font-semibold leading-4 text-gray-800">
                                    {AuctionData && AuctionData.EnterPrice !== undefined
                                        ? (
                                                AuctionData.EnterPrice +
                                                AuctionData.EnterPrice * 0.08
                                          ).toLocaleString()
                                        : ""}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
				);
			}}
		</Formik>
	);
};
