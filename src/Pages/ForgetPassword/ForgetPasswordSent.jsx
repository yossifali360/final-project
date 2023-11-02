import React , {useEffect, useRef} from "react";
import "./ForgetPassword.css";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ForgetPasswordSchema } from "../../Schemas/ForgetPasswordSchema";
import emailjs from '@emailjs/browser';
import { useSearchParams  } from 'react-router-dom'
import { getForgetCodes } from "../../MainServices/getPosts";

const initialValues = {
	code: "",
};



export const ForgetPasswordSent = ({notify}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ssValue = searchParams.get('mail');
    // const users = useSelector((state) => state.authReducer.users)
    const form = useRef()
    const sendEmail = (e,values) => {
        console.log("submit");
        e.preventDefault();
		// async function sendCode(userData) {
		// 	const id = await getForgetCodes(userData.Email);
		// 	if (id.length >= 1){
		// 		await deleteForgetCode(id[0].id)
		// 		await ForgetCodes(userData);
		// 	}
		// 	else{
		// 		await ForgetCodes(userData);
		// 	}
		// }
		// sendCode(userData)
        const waitForData = async () => {
            const data = await getForgetCodes(ssValue);
				if (data[0].ForgetCode == values.code){
					navigate(`/ChangePassReset?mail=${ssValue}&code=${data[0].ForgetCode}`)
				}else{
					notify(`Code is incorrect`,"Error")
				}
          };
          waitForData()
    };

    const handleResetSubmit = ()=>{

    }
	return (
		<Formik
			validationSchema={ForgetPasswordSchema}
			initialValues={initialValues}
			onSubmit={handleResetSubmit}
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
					<form ref={form} onSubmit={(e) => sendEmail(e, values)} className="py-6">
						<div className="flex fPass relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl h-full">
							<div className="hidden lg:block lg:w-1/2 bg-cover test"></div>
							<div className="w-full p-8 lg:w-1/2 my-2  md:my-20">
								<p className="text-xl text-gray-600 text-center">
									We Sent Reset Code To Your Mail
								</p>
								<div className="mt-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Enter Code
									</label>
									<input
										className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
										type="text"
                                        name="code"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
									/>
								</div>
								<div className="mt-8">
									<button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
										Reset Password
									</button>
								</div>
								<div className="mt-4 flex items-center justify-between">
									<span className="border-b w-1/5 md:w-1/4"></span>
									<Link
										to="/Register"
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
