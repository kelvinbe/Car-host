import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IPayout } from "../globaltypes";

const payouts:IPayout[] = []
const payoutSlice = createSlice({
    name: 'payout',
    initialState: {
        payouts:payouts,
    },
    reducers: {
        getPayouts(state, action){
            state.payouts= action.payload;
        }
    }
})

export const selectPayouts = (state: RootState)=>state.payout.payouts
export const { getPayouts } = payoutSlice.actions;
export default payoutSlice.reducer;