import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FiSettings, FiUsers } from "react-icons/fi";
import { MdDashboard, MdPayment, MdOutlinePostAdd, MdSignpost } from "react-icons/md";
import { AiOutlineProfile } from "react-icons/ai";
import { BsPostcard , BsCalendarDate } from "react-icons/bs";
import { getUsersApi } from "../../MainServices/authentication";
import { UsersDataDiv } from "./UsersData";
import { getPayments, getPosts } from "../../MainServices/getPosts";
import { PaymentsDataDiv } from "./PaymentsData";
import { getAuctions } from "../../MainServices/getAuctions";
import { PostsDataDiv } from "./PostsData";
import { AuctionsDataDiv } from "./AuctionsData";
import { AdsDataDiv } from "./AdsData";
import { getAds } from "../../MainServices/getAds";
import { getPromotions } from "../../MainServices/getPromotions";
import { PromotionsDataDiv } from "./PromotionsData";
import { Appointments } from "../Appointments/Appointments";

const tabNames = [
  "Appointments",
  "Users",
  "Payments",
  "Posts",
  "Auction",
  "Ads",
  "Promotions",
];

let UsersData = [];
let PaymentsData = [];
let PostsData = [];
let AuctionsData = [];
let AdsData = [];
let PromotionsData = [];

export const Dashboard = ({notify}) => {
  const [settingsTab, setSettingsTab] = useState("Appointments");

  const displayTab = (tabName) => {
    setSettingsTab(tabName);
  };

  const getUsersData = async () => {
    UsersData = await getUsersApi();
  };

  const getPaymentsData = async () => {
    PaymentsData = await getPayments();
  };

  const getPostsData = async () => {
    PostsData = await getPosts();
  };

  const getAuctionData = async () => {
    AuctionsData = await getAuctions();
  };

  const getAdsData = async () => {
    AdsData = await getAds();
  };

  const getPromotionsData = async () => {
    PromotionsData = await getPromotions();
  };

  useEffect(() => {
    getUsersData();
    getPaymentsData();
    getPostsData();
    getAuctionData();
    getAdsData();
    getPromotionsData();
  }, []);

  return (
    <div className="flex">
      <div className="bg-slate-500 mainTabs">
        <div className="container">
          <div className="flex py-5 border-b">
            <div>
              <MdDashboard className="text-white text-3xl mx-1" />
            </div>
            <span className="text-white ml-4 hover:text-emerald-500 duration-200 text-2xl">
              Dashboard
            </span>
          </div>
          {tabNames.map((tabName) => (
            <div
              key={tabName}
              onClick={() => displayTab(tabName)}
              className={`tab m-2 flex items-center text-center py-5 uppercase text-xl text-black ${
                settingsTab === tabName ? "active-tab" : ""
              }`}
            >
              <div className="icon">
                {tabName === "Appointments" && (
                  <BsCalendarDate className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Users" && (
                  <FiUsers className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Payments" && (
                  <MdPayment className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Posts" && (
                  <BsPostcard className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Auction" && (
                  <MdOutlinePostAdd className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Ads" && (
                  <MdSignpost className="text-2xl mr-5 text-white" />
                )}
                {tabName === "Promotions" && (
                  <AiOutlineProfile className="text-2xl mr-5 text-white" />
                )}
              </div>
              <span
                className={`tabText hover:text-emerald-500 duration-200 ${
                  settingsTab === tabName ? "active-text" : ""
                }`}
              >
                {tabName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="tab items-centersDivs w-full">
        <h3 className="text-3xl font-bold text-center my-8 dark:text-white">
          <span className="text-emerald-500">Elite Estates</span> Dashboard
        </h3>
        {settingsTab === "Appointments" ? <Appointments/> : null}
        {settingsTab === "Users" ? (
          <UsersDataDiv UsersData={UsersData} />
        ) : null}
        {settingsTab === "Payments" ? (
          <PaymentsDataDiv PaymentsData={PaymentsData} />
        ) : null}
        {settingsTab === "Posts" ? (
          <PostsDataDiv PostsData={PostsData} />
        ) : null}
        {settingsTab === "Auction" ? (
          <AuctionsDataDiv notify={notify} AuctionsData={AuctionsData} />
        ) : null}
        {settingsTab === "Ads" ? (
          <AdsDataDiv AdsData={AdsData} />
        ) : null}
        {settingsTab === "Promotions" ? (
          <PromotionsDataDiv PromotionsData={PromotionsData} />
        ) : null}
      </div>
    </div>
  );
};
