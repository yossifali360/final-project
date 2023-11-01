import { myAxios } from "./api";
export const getPromotions = async () => {
	const data = await myAxios("/Promotions");
	return data.data;
};
export const postPromotion = async (postPromotion) => {
	const data = await myAxios.post(`/Promotions`, postPromotion);
	return data.data;
};
