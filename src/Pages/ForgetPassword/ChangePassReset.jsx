import React, { useEffect, useRef } from "react";
import "./ForgetPassword.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordSchema } from "../../Schemas/ChangePasswordSchema";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "react-router-dom";
import { deleteForgetCode, getForgetCodes } from "../../MainServices/getPosts";
import { updateUserPassword } from "../../rtc/slices/authSlice";
import { getUsersApi } from "../../MainServices/authentication";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export const ChangePassReset = ({ notify }) => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailValue = searchParams.get("mail");
  const codeValue = searchParams.get("code");
  const form = useRef();

  const waitForData = async () => {
    const data = await getForgetCodes(emailValue);
    if (data[0].ForgetCode != codeValue) {
      notify(`No Data`, "Error");
    }
  };
  waitForData();

  const fetchData = async (values) => {
    try {
		console.log("fetchData Function");
      const users = await getUsersApi();
      console.log(users);
      const userObj = users.find((user) => user.email === emailValue);
      console.log(userObj);
      const userId = userObj.id;
	  console.log(userId);
      Dispatch(
        updateUserPassword({
          id: userId,
          password: values.password,
        })
      );
      navigate("/Login")
      notify(`Password Changed Successfuly You can Login Now !`, "Success");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
	const data = await getForgetCodes(emailValue);
    await deleteForgetCode(data[0].id)
  };

  const submitData = (e,values) => {
	console.log("submitData Function");
    e.preventDefault();
	fetchData(values);
  };

  const handleResetSubmit = (values) => {

  };

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
        handleBlur,
      }) => {
        return (
          <form
            ref={form}
			onSubmit={(e) => submitData(e, values)}
            className="py-6"
          >
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
                    className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover-bg-gray-600"
                  >
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