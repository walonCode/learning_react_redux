import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [];

export const fetchUser = createAsyncThunk('user/getUser',async() => {
    const response = await axios.get(BASE_URL)
    return response.data;
})

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUser.fulfilled, (state,action)=>{
            return action.payload;
        })
    }
})

export const allUser = (state) => state.users

export const selectUserById = (state,userId) => state.users.find(user => user.id === userId)

export default userSlice.reducer