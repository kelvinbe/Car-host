import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../utils/apiClient";
import { WITHDRAWALS_API } from "../hooks/constants";
import { RootState } from ".";
import { IWithdrawals } from "../globaltypes";
import LogRocket from "logrocket";

export const fetchWithdrawals = createAsyncThunk(
  "withdrawals/fetchWithdrawals",
  async (
    data: {
      page?: number,
      size?: number,
      status?: string;
      sort?: "asc" | "desc";
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try{
        const state: RootState = getState() as RootState;
        state.withdrawals.status
        if(state.withdrawals.status !== data.status){
            dispatch(withdrawalSlice.actions.resetState)
        }

        const withdrawals = await apiClient.get(WITHDRAWALS_API, {params: data})
        return withdrawals.data
    }catch(e){
        LogRocket.error(e)
        rejectWithValue(e)
    }
  }
);

interface InitialState {
    data: IWithdrawals[];
    loading: boolean;
    error: string | null;
    status: string;
}

const initialState: InitialState={
    data: [],
    loading: false,
    error: "",
    status: ""
}

const withdrawalSlice = createSlice({
    name: "withdrawals",
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            state.data = [];
          },
    }, 
    extraReducers: (builder)=>{
        builder.addCase(fetchWithdrawals.pending, (state)=>{
            state.loading=true
        })

        builder.addCase(fetchWithdrawals.fulfilled, (state, action)=>{
            state.loading=false
            state.data=action.payload
        })
        builder.addCase(fetchWithdrawals.rejected, (state, action)=>{
            state.loading=false
            state.error=action.payload as string
        })
    }
})

export default withdrawalSlice.reducer;
export const {resetState} = withdrawalSlice.actions
export const selectWithdrawals = (state: RootState)=>{
    return {
        withdrawals: state.withdrawals.data,
        loading: state.withdrawals.loading,
        error: state.withdrawals.error, 
        status: state.withdrawals.status 
    }
}