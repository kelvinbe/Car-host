import { createSlice } from "@reduxjs/toolkit";
import { IReservation } from "../globaltypes";
import { RootState } from ".";

const reservations: IReservation[] = []
const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservations: reservations,
    },
    reducers: {
        getReservations(state, action){
            state.reservations= action.payload;
        },
    }
})

export const selectReservations = (state: RootState)=>state.reservations.reservations
export const selectActiveReservations = (state: RootState)=>state.reservations.reservations.filter(({status})=>status==="Active" || status==="Blocked")
export const { getReservations } = reservationsSlice.actions;
export default reservationsSlice.reducer;



