import { myAxios } from "./api";

export const getUsersApi = async () =>{
    const data = await myAxios(`/users`)
    return data.data;
}

export const patchUsers = async (id) => {
    const data = await myAxios.patch(`/users${id}`);
    return data.data;
}

export const getUsersFavCart = async (id) =>{
    const data = await myAxios(`/users/${id}`)
    return data.data.favCart;
}

export const register = async (userData) =>{
    const data = await myAxios.post(`/users`,userData)
    return data.data;
}