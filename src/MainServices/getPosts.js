import { myAxios, myAxiosPay } from "./api";
export const getPosts = async () => {
	const data = await myAxios("/posts?_sort=id&_order=desc");
	return data.data;
};

export const postData = async (postData) => {
	const data = await myAxios.post(`/posts`, postData);
	return data.data;
};

export const getForgetCodes = async (email) => {
	const data = await myAxios(`/ForgetCodes?Email=${email}`);
	return data.data;
};

import axios from "axios";

export const getpayData = async (amount) => {
	try {
	  const response = await myAxiosPay.post("API/send-payment.php", {
		type: "send",
		token: "pubtqx3vjyn5ypji4osyovww86gw40",
		number: "01062697154",
		amount: amount,
		user: "Yossif",
		info: "test",
	  });
  
	  return response.data;
	} catch (error) {
	  console.error("Error making the API request:", error);
	  throw error;
	}
  };

export const ForgetCodes = async (postCode) => {
	const data = await myAxios.post(`/ForgetCodes`, postCode);
	return data.data;
};
export const deleteForgetCode = async (id) => {
	await myAxios.delete(`/ForgetCodes/${id}`);
	return true;
};
