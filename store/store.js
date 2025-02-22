import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminTripsSlice from './admin/trips-slice'
import UserTripsSlice from './user/trips-slice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminTrips: AdminTripsSlice,
        userTrips: UserTripsSlice,

    },
});

export default store;
