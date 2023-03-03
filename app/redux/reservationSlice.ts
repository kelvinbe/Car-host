import { createSlice } from "@reduxjs/toolkit";
import { dIReservation } from "../globaltypes";
import { RootState } from ".";

const reservations: dIReservation[] = []
const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservations: reservations,
        loading: false,
    },
    reducers: {
        getReservations(state, action){
            state.reservations= action.payload;
        }
    }
})

export const selectReservations = (state: RootState)=>state.reservations.reservations
export const selectActiveReservations = (state: RootState)=>state.reservations.reservations.filter(({status})=>status==="Active")
export const { getReservations } = reservationsSlice.actions;
export default reservationsSlice.reducer;



