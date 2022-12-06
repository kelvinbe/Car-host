import { createSlice } from "@reduxjs/toolkit";

interface Reservation {
    reservationId: string;
    hostId: string;
    startDateTime: string;
    endDateTime: string;
    vehicleId: string;
    vehicleModel: string;
    vehicleMake: string;
    vehiclePicUrl: string;
    locationAddress: string;
    marketName: string;
    total: string;
    status: string;
}

const initialState: {
    history: Reservation[]
} = {
    history: []
}

const historySlice = createSlice({
    name: "historySlice",
    initialState: initialState,
    reducers: {
        setHistory: (state, action) => {
            state.history = action.payload.history
        }
    }
})

export default historySlice.reducer;

// actions
export const { setHistory } = historySlice.actions;

// selectors
export const selectHistory = (state: any) => state.history;