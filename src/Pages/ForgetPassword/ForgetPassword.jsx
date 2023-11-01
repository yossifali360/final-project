import React , {useRef} from "react";
import "./ForgetPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../rtc/slices/authSlice";
import { ForgetPasswordSchema } from "../../Schemas/ForgetPasswordSchema";
import emailjs from '@emailjs/browser';
import { ForgetCodes } from "../../MainServices/getPosts";

const initialValues = {
	user_email: "",
};

export const ForgetPassword = ({notify}) => {
	const Navigate = useNavigate();

    const users = useSelector((state) => state.authReducer.users)
    const form = useRef()
  function sendEmail(e){
        e.preventDefault();
        let ForgetCode = Math.floor(Math.random() * 999999)
		console.log(ForgetCode);
		let userData = {
			"Email" : form.current[0].value,
			"ForgetCode": ForgetCode,
		};
		form.current[1].value = ForgetCode;
		async function ssssqd(userData) {
			await ForgetCodes(userData);
			console.log("sss");
		}
		ssssqd(userData)
        emailjs.sendForm('service_2slcdjb', 'template_m8tvur5', form.current, 'r-obV8PRJZfeUhbeo')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          })
          e.target.reset()
		  Navigate(`/ForgetPasswordSent?mail=${form.current[0].value}`)
		}
		async function handlePostSubmit(values) {
			await ForgetCodes(values);
			console.log("sss");
		}
	return (
		<Formik
			validationSchema={ForgetPasswordSchema}
			initialValues={initialValues}
			onSubmit={handlePostSubmit}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
			}) => {
                {console.log(values);}
				return (
					<form onSubmit={sendEmail} ref={form} className="py-6">
						<div className="flex fPass relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
							<div className="hidden lg:block lg:w-1/2 bg-cover test"></div>
							<div className="w-full p-8 lg:w-1/2 my-2  md:my-20">
								<p className="text-xl text-gray-600 text-center">
									Forget Password
								</p>
								<div className="mt-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Email Address
									</label>
									<input
										className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
										type="email"
                                        name="user_email"
                                        value={values.user_email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
									/>
                                    {errors.email && touched.email && (
											<div className="text-red-500">
												{errors.email}
											</div>
										)}
									<input className="opacity-0 code" type="text" name="msg" />
								</div>
								<div className="mt-8">
									<button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
										Next
									</button>
								</div>
								<div className="mt-4 flex items-center justify-between">
									<span className="border-b w-1/5 md:w-1/4"></span>
									<Link
										to="/Login"
										className="text-xs text-gray-500 uppercase"
									>
										or login
									</Link>
									<span className="border-b w-1/5 md:w-1/4"></span>
								</div>
							</div>
						</div>
					</form>
				);
			}}
		</Formik>
	);
};