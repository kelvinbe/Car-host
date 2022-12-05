import { createSlice } from '@reduxjs/toolkit';


const reservationSlice = createSlice({
    name: 'reservationSlice',
    initialState: {
        chosenReservation: null,
    },
    reducers: {
        setChosenReservation: (state, action) => {
            state.chosenReservation = action.payload;
        },
    }
})

export default reservationSlice.reducer;

// actions

export const { setChosenReservation } = reservationSlice.actions;

// selectors
export const selectChosenReservation = (state: any) => state.reservation.chosenReservation;