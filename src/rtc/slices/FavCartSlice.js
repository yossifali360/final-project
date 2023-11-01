import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myAxios } from "../../MainServices/api";
import { getUsersApi, getUsersFavCart } from "../../MainServices/authentication";
import { json } from "react-router-dom";

export const getFavCart = createAsyncThunk("favCart/getFavCart" , async (id) =>{
    const data = await getUsersFavCart(id);
    console.log(data);
    return data;
    
})

export const updateFavCart = createAsyncThunk("favCart/updateFavCart" , async (data) =>{
        await fetch ('http://localhost:3000/users/' +data.id , {
        method: 'PATCH',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({favCart : data.favCart})
    })
})

const initialState ={
    favCart :[],
    isLoading : false,
}
const favCartSlice = createSlice({
name:"favCart",
initialState,
reducers:{
    addItem : (state , action) =>{
        console.log(state.favCart);
        console.log("ssssssssssss");
        const productObj = state.favCart?.find(ele => ele.id === action.payload.id)
        if (!productObj){
            state.favCart.push({...action.payload,quantity: 1})
        }
    },
    removeItem : (state , action) =>{
        state.favCart = state.favCart.filter(ele => ele.id != action.payload)
    },
    removeAllItems : (state) =>{
        state.favCart = [];
    }
},
extraReducers:(builder) =>{
    builder.addCase(getFavCart.fulfilled,(state,action) =>{
        state.favCart = action.payload.favCart;
    })
}
})
const favCartReducer = favCartSlice.reducer;

export const {removeAllItems , addItem} = favCartSlice.actions;
export default favCartReducer;