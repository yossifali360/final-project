import { myAxios } from "./api";
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
export const ForgetCodes = async (postCode) => {
	const data = await myAxios.post(`/ForgetCodes`, postCode);
	return data.data;
};
