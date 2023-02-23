import { createSlice } from "@reduxjs/toolkit";
import { IReservation } from '../../types';

const initialState: {
    upcoming: IReservation[]
} = {
    upcoming: []
}

const upcomingSlice = createSlice({
    name: "upcoming",
    initialState,
    reducers: {
        setGetUpcomingReservations:(state, action) => {
            state.upcoming = action.payload.upcoming
        } 
    },
})

export default upcomingSlice.reducer;

export const {setGetUpcomingReservations} = upcomingSlice.actions

export const selectUpcoming = (state:any) => {state.upcoming.upcoming}