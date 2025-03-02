import { createSlice } from "@reduxjs/toolkit";

//create the initial state
const initialState = {
    count: 0
}

//create the counter slice
export const counterSlice = createSlice({
    //slice name
    name: 'counter',

    //slice initial state
    initialState,

    //functions available to the slices
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            if(state.count === 0){
                state.count = 0
            }else{
                state.count -= 1
            }
        },
        reset: (state) => {
            state.count = 0
        },
        incrementByAmount: (state,action) => {
            state.count += action.payload
        }
    }
})

//export the actions or the function of the slice
// to be used in the client components
export const { increment, decrement,reset,incrementByAmount } = counterSlice.actions;

//export the reducer it self
// to be used in the store
export default counterSlice.reducer