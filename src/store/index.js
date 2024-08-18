import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/UserSlice";
import CoordsSlice from "./slices/CoordsSlice";
import BikeSlice from "./slices/BikeSlice";


const store = configureStore({
    reducer:{
        user: userSlice,
        bike: BikeSlice,
        coords: CoordsSlice
    },
})

export default store;