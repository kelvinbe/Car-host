import axios, { AxiosError } from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { RootState } from ".";
import { app } from "../firebase/firebaseApp";
import { IReservation, IStation, IUserProfile, IUserSettings, IVehicle, IWithdrawals } from "../globaltypes";
import { USERSETTINGS_API, USERS_DOMAIN } from '../hooks/constants';
import apiClient from '../utils/apiClient';
import { isEmpty, isNull } from 'lodash';
import LogRocket from 'logrocket';

const users:IUserProfile[] = []

interface IReducer {
    users:IUserProfile[], //TODO: this will be phased out
    user: IUserProfile | null,
    profileLoading: boolean,
    profileError: any
    updateSettingsLoading: boolean,
    updateSettingsError: string | null | AxiosError,
    dashboardLoading: boolean,
    dashboardError: string | null | AxiosError,
    dashboardData: Partial<{
        reservations: Array<Partial<IReservation>>
        vehicles: Array<Partial<IVehicle>>
        withdrawal_requests: Array<Partial<IWithdrawals>>
        map_vehicles: Array<Partial<IVehicle & {
            station: Partial<IStation>
        }>>
    }> | null
}

const initialState: IReducer = {
    users:users,
    user: null,
    profileLoading: false,
    profileError: null,
    updateSettingsLoading: false,
    updateSettingsError: null,
    dashboardLoading: false,
    dashboardError: null,
    dashboardData: null
}


export const fetchUserDashboard = createAsyncThunk('user/fetchDashboard', async (undefined, {rejectWithValue, dispatch})=>{
    try {
        const result = await apiClient.get(`${USERS_DOMAIN}/dashboard`)
        console.log('resultISBEINGHIT', result)
        return result.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message ?? "Error fetching dashboard data")
    }
})

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
export const fetchUser = createAsyncThunk('user/fetchProfile', async (undefined, {rejectWithValue, dispatch})=>{
    try {
        const data = (await apiClient.get(USERS_DOMAIN)).data
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } catch (e)
    {
        LogRocket.error(e)
        return rejectWithValue(e)
    }
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
        const updatedUser= await apiClient.put(USERS_DOMAIN, updateData)
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
        builder.addCase(fetchUserDashboard.pending, (state)=>{
            state.dashboardLoading = true
            state.dashboardError = null
        })

        builder.addCase(fetchUserDashboard.fulfilled, (state, action)=>{
            state.dashboardLoading = false
            state.dashboardError = null
            state.dashboardData = action.payload
        })

        builder.addCase(fetchUserDashboard.rejected, (state, action)=>{
            state.dashboardLoading = false
            state.dashboardError = action.payload as string
        })
    }
})

export const selectUsers = (state: RootState)=>state.users.users
export const selectUser = (state: RootState) => {
    const data = state.users.user;

    if (isEmpty(data) && typeof window !== 'undefined') {
        try {
            const stringified = localStorage?.getItem('user');
            
            if (isEmpty(stringified)) return null;

            const parsedData = JSON.parse(stringified!);

            // Make sure parsedData is an object
            if (typeof parsedData === 'object' && parsedData !== null) {
                return parsedData as IUserProfile;
            } else {
                console.error('Invalid JSON format:', parsedData);
                return null;
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    }

    return data;
}

export const { getUsers } = userSlice.actions;
export default userSlice.reducer;


export const selectUpdateUserSettingsFeedback = (state: RootState)=>({
    loading: state.users.updateSettingsLoading,
    error: state.users.updateSettingsError
})

export const selectUpdateUserProfile=(state: RootState)=>{
    const user = localStorage?.getItem('user')
    if(isEmpty(state?.users?.user)) return {
        user: JSON.parse(user ?? "{}"),
        loading: state.users.profileLoading,
        error: state.users.profileError
    }
    
    return{
        user: state.users.user,
        loading: state.users.profileLoading,
        error: state.users.profileError
    }
}

export const selectDashboardFeedback = (state: RootState)=>({
    loading: state.users.dashboardLoading,
    error: state.users.dashboardError,
    data: state.users.dashboardData
})