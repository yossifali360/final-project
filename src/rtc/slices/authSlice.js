import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myAxios } from "../../MainServices/api";
import { getUsersApi } from "../../MainServices/authentication";
import { json } from "react-router-dom";

export const getUsers = createAsyncThunk("auth/getUsers" , async () =>{
    return await getUsersApi();
})

const loginData = JSON.parse(localStorage.getItem("Session")) || {
    isAuth : false,
    userData : null
}

const initialState ={
    users : [],
    ...loginData
}
const authSlice = createSlice({
name:"auth",
initialState,
reducers:{
    addUsers:(state,action) =>{
        state.users.push(action.payload)
    },
    login : (state,action) =>{
        state.isAuth = true;
        const data = action.payload;
        // delete data.favCart;
        state.userData = action.payload
        localStorage.setItem("Session",JSON.stringify({isAuth: true , userData:data}))
    },
    logout : (state) =>{
        state.isAuth = false,
        state.userData = null
        localStorage.setItem("Session",JSON.stringify({isAuth: false , userData:null}))
    }
},
extraReducers:(builder) =>{
    builder.addCase(getUsers.fulfilled,(state,action) =>{
        console.log(action.payload);
        state.users = action.payload
    })
}
})

const authReducer = authSlice.reducer;

export const {addUsers , login , logout} = authSlice.actions;
export default authReducer;