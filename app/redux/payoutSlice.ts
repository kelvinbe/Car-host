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

/**
 * @name updatePayoutMethod 
 * @description update a payout method from the user's account
 * 
 */

export const updatePayoutMethod = createAsyncThunk("payout/update", async (payoutMethod: Partial<PayoutMethods>, {rejectWithValue, dispatch}) => {
    try {
        await apiClient.put(`${PAYOUTMETHODS_API}/`,  payoutMethod, {params: {payout_method_id: payoutMethod.id}})
        dispatch(fetchUser())
        return null
    }catch (e) {
        return rejectWithValue(e)
    }
})

/**
 * @name createWithDrawal
 * @description create a withdrawal for the user
 * 
 */

export const createWithDrawal = createAsyncThunk("payout/createWithDrawal", async (data: {amount: number | string, payout_method_id: string }, {rejectWithValue, dispatch}, ) => {
    try{
        await apiClient.post(`${PAYOUTMETHODS_API}/`, data)
        dispatch(fetchUser())
        return null
    }catch(e){
        return rejectWithValue(e)
    }   
})

type State = {
    payouts: IPayout[],
    payoutCreateLoading: boolean,
    payoutCreateError: string | null,
    initiatePayoutLoading: boolean,
    initiatePayoutError: string | null,
    payoutUpdateLoading: boolean,
    payoutUpdateError: string | null
    createWithDrawalLoading: boolean,
    createWithDrawalError: string | null
}

const initialState: State = {
    payouts: [],
    payoutCreateLoading: false,
    payoutCreateError: null,
    initiatePayoutLoading: false,
    initiatePayoutError: null,
    payoutUpdateLoading: false,
    payoutUpdateError: null,
    createWithDrawalLoading: false,
    createWithDrawalError: null
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
        builder.addCase(createWithDrawal.pending, (state, action)=>{
            state.createWithDrawalLoading = true
            state.createWithDrawalError = null
        })
        builder.addCase(createWithDrawal.fulfilled, (state, action)=>{
            state.createWithDrawalLoading = true
            state.createWithDrawalError = null
        })
        builder.addCase(createWithDrawal.rejected, (state, action)=>{
            state.createWithDrawalLoading = false
            state.createWithDrawalError = "Error creating withdrawal method"
        })
        builder.addCase(updatePayoutMethod.pending, (state, action)=>{
            state.payoutUpdateLoading = true
            state.payoutUpdateError = null
        })
        builder.addCase(updatePayoutMethod.fulfilled, (state, action)=>{
            state.payoutUpdateLoading = true
            state.payoutUpdateError = null
        })
        builder.addCase(updatePayoutMethod.rejected, (state, action)=>{
            state.payoutUpdateLoading = false
            state.payoutUpdateError = "Error deleting payout method"
        })
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

export const selectUpdatePayoutFeedback = (state: RootState) => ({
    loading: state.payout.payoutUpdateLoading,
    error: state.payout.payoutUpdateError
})

export const selectCreateWithDrawalFeedback = (state: RootState) => ({
    loading: state.payout.createWithDrawalLoading,
    error: state.payout.createWithDrawalError
})


export const selectInitiatePayoutFeedback = (state: RootState) => ({
    loading: state.payout.initiatePayoutLoading,
    error: state.payout.initiatePayoutError
})