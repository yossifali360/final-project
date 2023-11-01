import { myAxios } from "./api";
export const getAuctions = async () => {
	const data = await myAxios("/Auctions?_sort=id&_order=desc");
	return data.data;
};

export const getSingleAuctions = async (id) => {
	const data = await myAxios(`/Auctions/${id}`);
	return data.data;
};

export const postAuctions = async (postData) => {
	const data = await myAxios.post(`/posts`, postData);
	return data.data;
};
