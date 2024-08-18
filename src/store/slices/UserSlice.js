import { createSlice } from "@reduxjs/toolkit";


const userSlice =createSlice({
    name: "user",
    initialState:{},
    reducers:{
        addUser(state,action){
            // state.push(action.payload)
            // state = action.payload
            console.log(action.payload)
            return { ...state, ...action.payload };
        },
        removeUser(state,action){
            return{}
        }

    }
})

export default userSlice.reducer;
export const {addUser,removeUser} = userSlice.actions;