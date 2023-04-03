import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { RootState } from ".";
import { app } from "../firebase/firebaseApp";
import { IUserProfile } from "../globaltypes";
import { USERS_DOMAIN } from '../hooks/constants';

const users:IUserProfile[] = []

interface IReducer {
    users:IUserProfile[], //TODO: this will be phased out
    user: IUserProfile | null,
    profileLoading: boolean,
    profileError: any
}

const initialState: IReducer = {
    users:users,
    user: null,
    profileLoading: false,
    profileError: null
}


/**
 * @name fetchUser
 * @description loads the user profile from the server
 */
export const fetchUser = createAsyncThunk('user/fetchProfile', (undefined, {rejectWithValue})=>{
    return getAuth(app).currentUser?.getIdToken().then(async (token)=>{
        try {

            const result = await axios.get(USERS_DOMAIN, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "x-user": "HOST"
                }
            })

            return result.data.data

        } catch (e) {
            return rejectWithValue(e)
        }
    }).catch(rejectWithValue)
})

const userSlice = createSlice({
    name: 'users',  // TODO: change to name, will be gradually phased out
    initialState,
    reducers: {
        getUsers(state, action){
            state.users= action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.pending, (state, action)=>{
            state.profileLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.profileLoading = false
            state.user = action.payload
        })
        builder.addCase(fetchUser.rejected, (state, action)=>{
            state.profileLoading = false
            state.profileError = action.payload
        })
    }
})

export const selectUsers = (state: RootState)=>state.users.users
export const { getUsers } = userSlice.actions;
export default userSlice.reducer;