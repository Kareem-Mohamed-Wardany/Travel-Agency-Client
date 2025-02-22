import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    tripList: [],
    pagination: {}
};

export const addNewTrip = createAsyncThunk(
    "/trips/addNewTrip",
    async (formData) => {
        const token = localStorage.getItem("token");
        const result = await fetch("http://localhost:5000/api/v1/admin/trips/add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const data = await result.json();
        return data;
    }
);

export const fetchAllTrips = createAsyncThunk(
    "/trips/fetchAllTrips",
    async (page) => {
        const token = localStorage.getItem("token");
        const result = await fetch(
            `http://localhost:5000/api/v1/admin/trips/get?page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await result.json();
        return data;
    }
);

export const editTrip = createAsyncThunk(
    "/trips/editTrip",
    async ({ id, formData }) => {
        const token = localStorage.getItem("token");
        const result = await fetch(
            `http://localhost:5000/api/v1/admin/trips/edit/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            }
        );
        const data = await result.json();
        return data;
    }
);

export const deleteTrip = createAsyncThunk(
    "/trips/deleteTrip",
    async (id) => {
        const token = localStorage.getItem("token");
        const result = await fetch(
            `http://localhost:5000/api/v1/admin/trips/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await result.json();
        return data;
    }
);

const AdminTripsSlice = createSlice({
    name: "adminTrips",
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
            .addCase(addNewTrip.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewTrip.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(addNewTrip.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(editTrip.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editTrip.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(editTrip.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteTrip.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteTrip.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default AdminTripsSlice.reducer;
