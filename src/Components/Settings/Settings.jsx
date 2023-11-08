import React, { useEffect, useRef } from "react";
import "./Settings.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordSchema } from "../../Schemas/ChangePasswordSchema";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "react-router-dom";
import { deleteForgetCode, getForgetCodes } from "../../MainServices/getPosts";
import { updateUserInfo, updateUserPassword } from "../../rtc/slices/authSlice";
import { getUsersApi } from "../../MainServices/authentication";
import { ChangePasswordSchema2 } from "../../Schemas/ChangePasswordSchema2";
import { ChangeProfileInfo } from "../../Schemas/ChangeInfo";



export const Settings = ({ notify , SessionData , setSessionData }) => {
  const initialValues = {
    email: (SessionData.userData && SessionData.userData.email) || "",
    name: (SessionData.userData && SessionData.userData.name) || "",
  };

  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (values) => {
      let users = await getUsersApi();
      let userObj = users.find((user) => user.email === SessionData.userData.email);
      console.log(userObj);
      console.log(users);
      const userId = userObj.id;
      await Dispatch(
        updateUserInfo({
          id: userId,
          email: values.email,
          name : values.name
        })
      );
      navigate("/")
      notify(`Data Changed Successfuly!`, "Success");
      users = await getUsersApi();
      console.log(users);
      userObj = users.find((user) => user.email === values.email);
      localStorage.setItem("Session",JSON.stringify({isAuth: true , userData:userObj}))
      let LoginData = JSON.parse(localStorage.getItem("Session"));
      setSessionData(LoginData)
  };

  const submitData = (e,values) => {
    e.preventDefault();
    fetchData(values);
  };

  const handleResetSubmit = (values) => {

  };

  return (
    <Formik
      validationSchema={ChangeProfileInfo}
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
        console.log(values);
        return (
          <form
			onSubmit={(e) => submitData(e, values)}
            className="py-6"
          >
            <div className="flex fPass relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl h-full">
              <div className="w-full p-8 my-2  md:my-10">
                <p className="text-xl text-gray-600 text-center">
                  Edit Your Profile
                </p>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Your Email
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="text"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-gray-700 mb-3 text-white font-bold py-2 px-4 w-full rounded hover-bg-gray-600"
                  >
                    Change Information
                  </button>
                </div>
                <Link to={"/ChangePassword"}>Change Your Password ?</Link>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};