import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IUserProfile } from "../globaltypes";

const users:IUserProfile[] = []
const userSlice = createSlice({
    name: 'users',
    initialState: {
        users:users,
    },
    reducers: {
        getUsers(state, action){
            state.users= action.payload;
        }
    }
})

export const selectUsers = (state: RootState)=>state.users.users
export const { getUsers } = userSlice.actions;
export default userSlice.reducer;