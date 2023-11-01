import React from "react";
import "./Register.css";
import { Link} from 'react-router-dom';
import { Formik } from "formik";
import { RegisterSchema } from "../Schemas/RegisterSchema";
import { register } from "../MainServices/authentication";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, getUsers } from "../rtc/slices/authSlice";
const initialValues = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	Role : "User"
};

export const Register = ({notify}) => {

	const users = useSelector((state) => state.authReducer.users)

	const dispatch = useDispatch();

	async function handleRegisterSubmit(values,{resetForm}) {
		if (users.find(user => user.email == values.email)){
			notify(`Email Found ! Please Login in`,"Warn")
		}else{
			notify(`Account Created ! Please Login in`,"Success")
			const userData = {...values}
			delete userData.confirmPassword
			await register(userData);
			dispatch(addUsers(userData))
			resetForm();
		}
	}
	return (
		<Formik
			validationSchema={RegisterSchema}
			initialValues={initialValues}
			onSubmit={handleRegisterSubmit}
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
					<div className="py-6">
						<div className="flex relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
							<div className="hidden lg:block lg:w-1/2 bg-cover test"></div>
							<form
								className="w-full p-8 lg:w-1/2"
								onSubmit={handleSubmit}
							>
								<div>
									<p className="text-xl text-gray-600 text-center">
										Welcome to Our Family!
									</p>
									<div className="mt-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">
											Name
										</label>
										<input
											name="name"
											value={values.name}
											onBlur={handleBlur}
											onChange={handleChange}
											className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
											type="text"
										/>
										{errors.name && touched.name && (
											<div className="text-red-500">
												{errors.name}
											</div>
										)}
									</div>
									<div className="mt-4">
										<label className="block text-gray-700 text-sm font-bold mb-2">
											Email Address
										</label>
										<input
											name="email"
											value={values.email}
											type="email"
											placeholder="Enter email"
											onChange={handleChange}
											onBlur={handleBlur}
											className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
										/>
										{errors.email && touched.email && (
											<div className="text-red-500">
												{errors.email}
											</div>
										)}
									</div>
									<div className="mt-4">
										<div className="flex justify-between">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												Password
											</label>
										</div>
										<input
											name="password"
											value={values.password}
											onChange={handleChange}
											onBlur={handleBlur}
											className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
											type="password"
										/>
										{errors.password &&
											touched.password && (
												<div className="text-red-500">
													{errors.password}
												</div>
											)}
									</div>
									<div className="mt-4">
										<div className="flex justify-between">
											<label className="block text-gray-700 text-sm font-bold mb-2">
												Confirm Password
											</label>
										</div>
										<input
											name="confirmPassword"
											value={values.confirmPassword}
											onBlur={handleBlur}
											onChange={handleChange}
											className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
											type="password"
										/>
										{errors.confirmPassword &&
											touched.confirmPassword && (
												<div className="text-red-500">
													{errors.confirmPassword}
												</div>
											)}
									</div>
									<div className="mt-8">
										<button
											type="submit"
											className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
										>
											Register
										</button>
									</div>
									<div className="mt-4 flex items-center justify-between">
										<span className="border-b w-1/5 md:w-1/4"></span>
										<Link
											to="/Login"
											className="text-xs text-gray-500 uppercase"
										>
											or sign in
										</Link>
										<span className="border-b w-1/5 md:w-1/4"></span>
									</div>
								</div>
							</form>
						</div>
					</div>
				);
			}}
		</Formik>
	);
};
