import { createSlice } from "@reduxjs/toolkit";


const coordsSlice =createSlice({
    name: "coords",
    initialState:{},
    reducers:{
        addCoords(state,action){
            // state.push(action.payload)
            // state = action.payload
            console.log(action.payload)
            return { ...state, ...action.payload };
        },
        removeCoords(state,action){
            return{}
        }

    }
})

export default coordsSlice.reducer;
export const {addCoords,removeCoords} = coordsSlice.actions;