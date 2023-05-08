import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IPayout, PayoutMethods } from "../globaltypes";
import apiClient from "../utils/apiClient";
import { PAYOUTMETHODS_API } from "../hooks/constants";
import { fetchUser } from "./userSlice";


/**
 * @name initiatePayout 
 * @description initiates payouts
 */
export const initiatePayout = createAsyncThunk("payout/initiate", async (type: 'mpesa' | 'mtn', { rejectWithValue })=>{
    try {
        // TODO: update this endpoint on the backend to handle bulk payouts
        const result = await apiClient.post(`${PAYOUTMETHODS_API}/${type}`)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})


/**
 * @name addPayoutMethod 
 * @description adds a new payout method to the user's account
 * 
 */
export const addPayoutMethod = createAsyncThunk("payout/add", async (payoutMethod: Partial<PayoutMethods>, {rejectWithValue, dispatch}) => {
    try {
        await apiClient.post(`${PAYOUTMETHODS_API}/`, payoutMethod)
        dispatch(fetchUser())
        return null
    } catch (e) {
        return rejectWithValue(e)
    }
})

type State = {
    payouts: IPayout[],
    payoutCreateLoading: boolean,
    payoutCreateError: string | null,
    initiatePayoutLoading: boolean,
    initiatePayoutError: string | null,
}

const initialState: State = {
    payouts: [],
    payoutCreateLoading: false,
    payoutCreateError: null,
    initiatePayoutLoading: false,
    initiatePayoutError: null,
}

const payoutSlice = createSlice({
    name: 'payout',
    initialState,
    reducers: {
        getPayouts(state, action){
            state.payouts= action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(addPayoutMethod.pending, (state, action)=>{
            state.payoutCreateLoading = true
            state.payoutCreateError = null
        })
        builder.addCase(addPayoutMethod.fulfilled, (state, action)=>{
            state.payoutCreateLoading = false
            state.payoutCreateError = null
        })
        builder.addCase(addPayoutMethod.rejected, (state, action)=>{
            state.payoutCreateLoading = false
            state.payoutCreateError = "Error creating payout method"
        })
        builder.addCase(initiatePayout.pending, (state, action)=>{
            state.initiatePayoutLoading = true
            state.initiatePayoutError = null
        })
        builder.addCase(initiatePayout.fulfilled, (state, action)=>{
            state.initiatePayoutLoading = false
            state.initiatePayoutError = null
        })
        builder.addCase(initiatePayout.rejected, (state, action)=>{
            state.payoutCreateLoading = false
            state.payoutCreateError = "Error initiating payout"
        })
    }
})

export const selectPayouts = (state: RootState)=>state.payout.payouts
export const { getPayouts } = payoutSlice.actions;
export default payoutSlice.reducer;

export const selectPayoutFeedback = (state: RootState) => ({
    loading: state.payout.payoutCreateLoading,
    error: state.payout.payoutCreateError
})


export const selectInitiatePayoutFeedback = (state: RootState) => ({
    loading: state.payout.initiatePayoutLoading,
    error: state.payout.initiatePayoutError
})