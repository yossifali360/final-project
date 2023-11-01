import { myAxios } from "./api";
export const getAds = async () => {
	const data = await myAxios("/Ads");
	return data.data;
};
export const postAd = async (postAd) => {
	const data = await myAxios.post(`/Ads`, postAd);
	return data.data;
};
