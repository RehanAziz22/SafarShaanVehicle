import { createSlice } from "@reduxjs/toolkit";


const bikeSlice =createSlice({
    name: "bike",
    initialState:null,
    reducers:{
        addBike(state,action){
            // state.push(action.payload)
            // state = action.payload
            console.log(action.payload)
            return { ...state, ...action.payload };
        },
        removeBike(state,action){
            return{}
        }

    }
})

export default bikeSlice.reducer;
export const {addBike,removeBike} = bikeSlice.actions;