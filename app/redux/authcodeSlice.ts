import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IAuthCode } from "../globaltypes";

const authcode:IAuthCode[] = []
const authcodeSlice = createSlice({
    name: 'authcode',
    initialState: {
        authcode: authcode,
    },
    reducers: {
        getAuthcode(state, action){
            state.authcode= action.payload;
        }
    }
})

export const selectAuthcode = (state: RootState)=>state.authcode.authcode
export const { getAuthcode } = authcodeSlice.actions;
export default authcodeSlice.reducer;