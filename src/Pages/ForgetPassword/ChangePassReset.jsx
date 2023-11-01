import React , {useEffect, useRef} from "react";
import "./ForgetPassword.css";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordSchema } from "../../Schemas/ChangePasswordSchema";
import emailjs from '@emailjs/browser';
import { useSearchParams  } from 'react-router-dom'
import { getForgetCodes } from "../../MainServices/getPosts";

const initialValues = {
	password: "",
	confirmPassword: "",
};


// cont Dispatch = useDispatch()

export const ChangePassReset = ({notify}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const emailValue = searchParams.get('mail');
    const codeValue = searchParams.get('code');
    // const users = useSelector((state) => state.authReducer.users)
    const form = useRef()
    const changePass = (e) => {
        console.log("submit");
        e.preventDefault();
    };
    const waitForData = async () => {
        const aa = await getForgetCodes(emailValue);
        if (aa.length > 1 ){
            aa.map((code)=>{
                if (code.ForgetCode == codeValue){
                    console.log("True");
                }else{
                    // navigate("/ForgetPassword")
                }
            })
        }else{
            console.log("The array is empty.");
        }
      };
      waitForData()
    const handleResetSubmit = ()=>{

    }
	return (
		<Formik
			validationSchema={ChangePasswordSchema}
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
					<form ref={form} onSubmit={(e) => changePass(e, values)} className="py-6">
						<div className="flex fPass relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl h-full">
							<div className="hidden lg:block lg:w-1/2 bg-cover test"></div>
							<div className="w-full p-8 lg:w-1/2 my-2  md:my-20">
								<p className="text-xl text-gray-600 text-center">
									Choose A New Password
								</p>
								<div className="mt-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Password
									</label>
									<input
										className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
										type="password"
                                        name="password"
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
									/>
									    {errors.password && touched.password && (
											<div className="text-red-500">
												{errors.password}
											</div>
										)}
								</div>
								<div className="mt-4">
									<label className="block text-gray-700 text-sm font-bold mb-2">
										Confirm Password
									</label>
									<input
										className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
										type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
									/>
										{errors.confirmPassword && touched.confirmPassword && (
											<div className="text-red-500">
												{errors.confirmPassword}
										</div>
										)}
								</div>
								<div className="mt-8">
									<button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
										Change Password
									</button>
								</div>
							</div>
						</div>
					</form>
				);
			}}
		</Formik>
	);
};
