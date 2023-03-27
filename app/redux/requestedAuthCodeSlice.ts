import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IRequestedAuthCode } from "../globaltypes";

const requestedAuthCode:IRequestedAuthCode[] = []
const requestedAuthCodeSlice = createSlice({
    name: 'requestedAuthCode',
    initialState: {
        requestedAuthCode: requestedAuthCode,
    },
    reducers: {
        getRequestedAuthCode(state, action){
            state.requestedAuthCode= action.payload;
        }
    }
})
export const selectRequestedAuthCode = (state: RootState)=>state.requestedAuthCode.requestedAuthCode
export const { getRequestedAuthCode } = requestedAuthCodeSlice.actions;
export default requestedAuthCodeSlice.reducer;