import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { RootState } from ".";
import { app } from "../firebase/firebaseApp";
import { IUserProfile } from "../globaltypes";
import { USERS_DOMAIN } from '../hooks/constants';
import apiClient from '../utils/apiClient';
import { isNull } from 'lodash';

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
 * @name createUser 
 * @description creates a new user in the database
 */
export const createUser = createAsyncThunk('user/create', async (undefined, {rejectWithValue})=>{
    try {
        const user = getAuth(app).currentUser
        if (isNull(user)) return rejectWithValue("Not logged in") 
        const result = await apiClient.post(USERS_DOMAIN, {
            email: user.email,
            handle: user.displayName,
            profile_pic_url: user.photoURL,
            user_type: "HOST",
        })
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})


/**
 * @name fetchUser
 * @description loads the user profile from the server
 */
export const fetchUser = createAsyncThunk('user/fetchProfile', (undefined, {rejectWithValue, dispatch})=>{
    return getAuth(app).currentUser?.getIdToken().then(async (token)=>{
        const user = getAuth(app).currentUser
        try {
            if (isNull(user)) return rejectWithValue("Not logged in")
            if (user.metadata.creationTime === user.metadata.lastSignInTime) await dispatch(createUser()) // if user is new, create a new user

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
export const selectUser = (state: RootState)=>state.users.user
export const { getUsers } = userSlice.actions;
export default userSlice.reducer;