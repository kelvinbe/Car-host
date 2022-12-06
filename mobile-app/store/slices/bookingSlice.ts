import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    status: 'Ready' | 'Complete' | 'Incomplete',
    authCode: string | null,
    rate: string | null,
    tax: string | null,
    total: string | null,
    vehicleId: number | null,
    startDateTime: string,
    endDateTime: string,
    duration: number,
    locationId: number | null,
    hostId: number | null,
    billingId: string | null
} = {
    status: 'Incomplete',
    authCode: null,
    rate: null,
    tax: null,
    total: null,
    vehicleId: null,
    startDateTime: new Date().toLocaleDateString(),
    endDateTime: new Date().toDateString(),
    duration: 1,
    locationId: null,
    hostId: null,
    billingId: null,
}

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload.status
        },
        setAuthCode: (state, action) => {
            state.authCode = action.payload.authode
        },
        setStartDateTime: (state, action) => {
            state.startDateTime = action.payload.startDateTime
        },
        setEndDateTime: (state, action) => {
            state.endDateTime = action.payload.endDateTime
        },
        setHostId: (state, action) => {
            state.hostId = action.payload.hostId
        },
        setVehicle: (state, action) => {
            state.vehicleId = action.payload.vehicleId,
            state.hostId = action.payload.vehicleId,
            state.locationId = action.payload.locationId,
            state.rate = action.payload.rate,
            state.tax = action.payload.tax,
            state.total = action.payload.total,
            state.duration = action.payload.duration
        },
        setBillingId: (state, action) => {
            state.billingId = action.payload.billingId
        }
    }
})

export default bookingSlice.reducer;

// actions
export const {
    setStatus,
    setAuthCode,
    setStartDateTime,
    setEndDateTime,
    setHostId,
    setVehicle,
    setBillingId
} = bookingSlice.actions;

// selectors
export const selectAuthenticated = (state: any) => state.authenticated;