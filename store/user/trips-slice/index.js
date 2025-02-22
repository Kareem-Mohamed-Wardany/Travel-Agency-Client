import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    tripList: [],
    pagination: {}
};


export const fetchAllTrips = createAsyncThunk(
    "/trips/fetchAllTrips",
    async (page) => {
        const token = localStorage.getItem("token");
        const result = await fetch(
            `http://localhost:5000/api/v1/user/trips/get?page=${page}`,
            {
                method: "GET",
            }
        );
        const data = await result.json();
        return data;
    }
);

const UserTripsSlice = createSlice({
    name: "userTrips",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTrips.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllTrips.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload && action.payload.data && action.payload.data.trips) {
                    state.tripList = action.payload.data.trips;
                    state.pagination = action.payload.data.pagination || {};
                } else {
                    state.tripList = [];
                    state.pagination = {};
                }
            })
            .addCase(fetchAllTrips.rejected, (state) => {
                state.isLoading = false;
                state.tripList = [];
                state.pagination = {};
            })
    },
});

export default UserTripsSlice.reducer;
