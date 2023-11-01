import { myAxios } from "./api";
export const getProjects = async () => {
	const data = await myAxios("/Projects?_sort=id&_order=desc");
	return data.data;
};
export const postProjects = async (postProjects) => {
	const data = await myAxios.post(`/Projects`, postProjects);
	return data.data;
};
