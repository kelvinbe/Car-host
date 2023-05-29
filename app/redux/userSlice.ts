import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { RootState } from ".";
import { app } from "../firebase/firebaseApp";
import { IUserProfile, IUserSettings } from "../globaltypes";
import { USERSETTINGS_API, USERS_DOMAIN } from '../hooks/constants';
import apiClient from '../utils/apiClient';
import { isNull } from 'lodash';
import LogRocket from 'logrocket';

const users:IUserProfile[] = []

interface IReducer {
    users:IUserProfile[], //TODO: this will be phased out
    user: IUserProfile | null,
    profileLoading: boolean,
    profileError: any
    updateSettingsLoading: boolean,
    updateSettingsError: string | null | AxiosError,
}

const initialState: IReducer = {
    users:users,
    user: null,
    profileLoading: false,
    profileError: null,
    updateSettingsLoading: false,
    updateSettingsError: null,
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
        LogRocket.error(e)
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
                    "x-user": "HOST",
                    "ngrok-skip-browser-warning": "true"
                }
            })

            return result.data.data

        } catch (e) {
            LogRocket.error(e)
            return rejectWithValue(e)
        }
    }).catch(rejectWithValue)
})

/**
 * @name UpdateUserSettings 
 * @description updates the user settings
 */
export const updateUserSettings = createAsyncThunk('user/updateSettings', async (settings: Partial<IUserSettings>, {rejectWithValue, dispatch})=>{
    try {
        const user = getAuth(app).currentUser
        if (isNull(user)) return rejectWithValue("Not logged in") 
        const result = await apiClient.put(`${USERSETTINGS_API}`, settings)
        await dispatch(fetchUser())
        return result.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue(e)
    }
})

export const updateUserProfile= createAsyncThunk('user/updateUserProfile', async (updateData: Partial<IUserProfile>, {rejectWithValue, dispatch})=>{
    try{
        const updatedUser= await apiClient.patch(USERS_DOMAIN, updateData)
        await dispatch(fetchUser())
        return updatedUser.data
    } catch (e){
        LogRocket.error(e)
        return rejectWithValue(e)
    }
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
        builder.addCase(updateUserSettings.pending, (state, action)=>{
            state.updateSettingsLoading = true
            state.updateSettingsError = null
        })
        builder.addCase(updateUserSettings.fulfilled, (state, action)=>{
            state.updateSettingsLoading = false
            state.updateSettingsError = null
        })
        builder.addCase(updateUserSettings.rejected, (state, action)=>{
            state.updateSettingsLoading = false
            state.updateSettingsError = action.error.message ?? "Error updating settings"
        })

        builder.addCase(updateUserProfile.pending, (state)=>{
            state.profileLoading=true
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action)=>{
            state.profileLoading=false 
            state.user=action.payload
        })

        builder.addCase(updateUserProfile.rejected, (state, action)=>{
            state.profileLoading=false 
            state.profileError=action.payload
        })
    }
})

export const selectUsers = (state: RootState)=>state.users.users
export const selectUser = (state: RootState)=>state.users.user
export const { getUsers } = userSlice.actions;
export default userSlice.reducer;


export const selectUpdateUserSettingsFeedback = (state: RootState)=>({
    loading: state.users.updateSettingsLoading,
    error: state.users.updateSettingsError
})

export const selectUpdateUserProfile=(state: RootState)=>{
    return{
        user: state.users.user,
        loading: state.users.profileLoading,
        error: state.users.profileError
    }
}