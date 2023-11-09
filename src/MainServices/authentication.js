import { myAxios } from "./api";

export const getUsersApi = async () =>{
    const data = await myAxios(`/users`)
    return data.data;
}

export const patchUsers = async (id) => {
    const data = await myAxios.patch(`/users${id}`);
    return data.data;
}

export const deleteUserData = async (id) => {
	await myAxios.delete(`/users/${id}`);
	return true;
};

export const getUsersFavCart = async (id) =>{
    const data = await myAxios(`/users/${id}`)
    return data.data.favCart;
}

export const getUsersAuctions = async (id) =>{
    const data = await myAxios(`/users/${id}`)
    return data.data.HisAuctions;
}

export const register = async (userData) =>{
    const data = await myAxios.post(`/users`,userData)
    return data.data;
}