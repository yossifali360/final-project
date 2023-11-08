import React, { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Nav/Navbar";
import { Banner } from "./Components/HomeBanner/Banner";
import { Services } from "./Components/Services/Services";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./Components/ErrorPage/ErrorPage";
import { Posts } from "./Components/Posts/Posts";
import { ContactUs } from "./Components/ContactUs/ContactUs";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { Footer } from "./Components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./rtc/slices/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WhyUs } from "./Components/WhyUs/WhyUs";
import { LatestProjects } from "./Components/Latest Projects/LatestProjects";
import { OurPartners } from "./Components/OurPartners/OurPartners";
import { IsNotLoggedIn } from "./Components/IsNotLoggedIn/IsNotLoggedIn";
import { getFavCart, updateFavCart } from "./rtc/slices/FavCartSlice";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { ForgetPassword } from "./Pages/ForgetPassword/ForgetPassword";
import { ForgetPasswordSent } from "./Pages/ForgetPassword/ForgetPasswordSent";
import { ChangePassReset } from "./Pages/ForgetPassword/ChangePassReset";
import { SingleAuctions } from "./Components/SingleAuctions/SingleAuctions.jsx";
import { AllAuctions } from "./Components/AllAuctions/AllAuctions";
import { CheckOut } from "./Components/CheckOut/CheckOut";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { Settings } from "./Components/Settings/Settings.jsx";
import { ChangePasswordInfo } from "./Components/Settings/ChangePassword.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { IsLoggedIn } from "./Components/IsLoggedIn/IsLoggedIn.jsx";

function App() {
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const userData = useSelector((state) => state.authReducer.userData);
	const favCart = useSelector((state) => state.favCartReducer.favCart);
	const [Loading, setLoading] = useState(true);


	let LoginData = JSON.parse(localStorage.getItem("Session")) ?? [];
	const [SessionData, setSessionData] = useState(LoginData)
	console.log(SessionData);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsers());
		setLoading(false);
	}, []);

	useEffect(() => {
		if (isAuth) {
			dispatch(getFavCart(userData.id));
		}
	}, [isAuth]);

	useEffect(() => {
		if (isAuth) {
			dispatch(updateFavCart({ id: userData.id, favCart: favCart }));
		}
	}, [favCart]);

	// Notify
	const notify = (msg, type) => {
		if (type === "Error") {
			toast.error(msg);
		} else if (type === "Success") {
			toast.success(msg);
		} else if (type === "Warn") {
			toast.warn(msg);
		}
	};

	return (
		<>
			{Loading ? (
				<div className="flex items-center justify-center h-screen">
					<ClipLoader
						color={"#10b981"}
						loading={Loading}
						size={100}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				</div>
			) : (
				<>
					<BrowserRouter>
						<Navbar notify={notify} SessionData={SessionData} />
						<ScrollToTop />
						<Routes>
							<Route
								path="/"
								element={
									<>
										<Banner />
										<Services />
										<WhyUs />
										<LatestProjects notify={notify}/>
										<OurPartners />
									</>
								}
							/>
							<Route
								path="Posts"
								element={<Posts notify={notify}  SessionData={SessionData}/>}
							/>
							<Route path="Contact" element={<ContactUs />} />
							<Route
								path="ForgetPassword"
								element={<ForgetPassword />}
							/>
							<Route path="Dashboard" element={<Dashboard />} />
							<Route path="Auctions" element={<AllAuctions />} />
							<Route
								path="SingleAuctions"
								element={<SingleAuctions />}
							/>
							<Route
								path="ForgetPasswordSent"
								element={<ForgetPasswordSent notify={notify} />}
							/>
							<Route
								path="CheckOut"
								element={<CheckOut notify={notify} SessionData={SessionData} />}
							/>
							<Route
								path="ChangePassReset"
								element={<ChangePassReset notify={notify} />}
							/>
							<Route
								path="Settings"
								element={
									<>
										<IsLoggedIn>
											<Settings notify={notify} SessionData={SessionData} setSessionData={setSessionData}/>
										</IsLoggedIn>
									</>
								}
								/>
							<Route
								path="ChangePassword"
								element={<ChangePasswordInfo notify={notify} SessionData={SessionData} />}
							/>
							<Route
								path="Register"
								element={
									<>
										<IsNotLoggedIn>
											<Register notify={notify} />
										</IsNotLoggedIn>
									</>
								}
							/>
							<Route
								path="Login"
								element={
									<>
										<IsNotLoggedIn>
											<Login notify={notify} setSessionData={setSessionData} />
										</IsNotLoggedIn>
									</>
								}
							/>
							<Route path="*" element={<ErrorPage />} />
						</Routes>
						<Footer />
					</BrowserRouter>
					<ToastContainer />
				</>
			)}
		</>
	);
}

export default App;
