import React, { useEffect, useRef } from "react";
import "./Settings.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordSchema } from "../../Schemas/ChangePasswordSchema";
import emailjs from "@emailjs/browser";
import { useSearchParams } from "react-router-dom";
import { deleteForgetCode, getForgetCodes } from "../../MainServices/getPosts";
import { updateUserPassword } from "../../rtc/slices/authSlice";
import { getUsersApi } from "../../MainServices/authentication";
import { ChangePasswordSchema2 } from "../../Schemas/ChangePasswordSchema2";

const initialValues = {
  currentPassword :"",
  newPassword: "",
  confirmNewPassword: "",
};

export const ChangePasswordInfo = ({ notify , SessionData }) => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (values) => {
      const users = await getUsersApi();
      const userObj = users.find((user) => user.email === SessionData.userData.email);
      const userId = userObj.id;
      Dispatch(
        updateUserPassword({
          id: userId,
          password: values.newPassword,
        })
      );
      navigate("/Settings")
      notify(`Password Changed Successfuly!`, "Success");
  };

  const submitData = async (e,values) => {
    e.preventDefault();
    const users = await getUsersApi();
    const userObj = users.find((user) => user.email === SessionData.userData.email);
    if (values.currentPassword == userObj.password){
        fetchData(values);
        localStorage.setItem("Session",JSON.stringify({isAuth: true , userData:userObj}))
    }else{
        notify(`Current Password is Wrong !`, "Error");
    }
  };

  const handleResetSubmit = (values) => {

  };

  return (
    <Formik
      validationSchema={ChangePasswordSchema2}
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
			onSubmit={(e) => submitData(e, values)}
            className="py-6"
          >
            <div className="flex fPass relative bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl h-full">
              <div className="w-full p-8 my-2">
                <p className="text-xl text-gray-600 text-center">
                  Change Your Password
                </p>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Current Password
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    name="currentPassword"
                    value={values.currentPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.currentPassword && touched.currentPassword && (
                    <div className="text-red-500">
                      {errors.currentPassword}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    name="newPassword"
                    value={values.newPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-red-500">
                      {errors.newPassword}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm New Password
                  </label>
                  <input
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.confirmNewPassword &&
                    touched.confirmNewPassword && (
                      <div className="text-red-500">
                        {errors.confirmNewPassword}
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