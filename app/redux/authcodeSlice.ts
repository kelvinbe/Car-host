import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthCode, IUserProfile, IVehicle } from "../globaltypes";
import apiClient from "../utils/apiClient";
import { AUTHCODE_DOMAIN } from "../hooks/constants";
import {AxiosError} from "axios";
import { RootState } from ".";
import LogRocket from "logrocket";


interface ReducerState {
    loadingAuthCodes: boolean;
    authcodesError: string | null;
    authcodes: Array<Partial<IAuthCode> & Partial<{
        user: Partial<IUserProfile>,
        vehicle: Partial<IVehicle>
    }>>;
    loadingActivation: boolean;
    activationError: string | null;
    loadingUpdate: boolean;
    updateError: string | null;
}

const initialState: ReducerState = {
    loadingAuthCodes: false,
    authcodesError: null,
    authcodes: [],
    loadingActivation: false,
    activationError: null,
    loadingUpdate: false,
    updateError: null
}

export const fetchAuthCodes = createAsyncThunk('authcodes/fetchAuthCodes', async (arg,{rejectWithValue})=>{
    try {
        const authcodes = (await apiClient.get(AUTHCODE_DOMAIN, {
            params: {
                page: 1,
                size: 20
            }
        })).data 
        return authcodes
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.response?.data?.message)
    }
})

export const activateAuthCode = createAsyncThunk('authcodes/activateAuthCode', async (arg: string, {rejectWithValue, dispatch})=>{
    try {
        const res = (await apiClient.post(`${AUTHCODE_DOMAIN}`,null, {
            params: {
                auth_code_id: arg
            }
        }))
        await dispatch(fetchAuthCodes())

        return null
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.response?.data?.message ?? "Something went wrong")
    }
})


export const updateAuthCode = createAsyncThunk('authcodes/updateAuthCode', async (args: Partial<IAuthCode>, {rejectWithValue, dispatch})=>{
    try {
        const res = (await apiClient.put(`${AUTHCODE_DOMAIN}`, args, {
            params: {
                auth_code_id: args.id
            }
        }))

        await dispatch(fetchAuthCodes())

        return null
    } catch (e) {
        LogRocket.error(e)
        rejectWithValue(e)
    }
})



const authCodeSlice = createSlice({
    initialState,
    name: "authcodes",
    reducers: {
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchAuthCodes.pending, (state)=>{
            state.loadingAuthCodes = true
            state.authcodesError = null
        })
        builder.addCase(fetchAuthCodes.fulfilled, (state, action)=>{
            state.loadingAuthCodes = false
            state.authcodesError = null
            state.authcodes = action.payload
        })
        builder.addCase(fetchAuthCodes.rejected, (state, action)=>{
            state.loadingAuthCodes = false
            state.authcodesError = action.payload as string
        })
        builder.addCase(activateAuthCode.pending, (state)=>{
            state.loadingActivation = true
            state.activationError = null
        })
        builder.addCase(activateAuthCode.fulfilled, (state, action)=>{
            state.loadingActivation = false
            state.activationError = null
        })
        builder.addCase(activateAuthCode.rejected, (state, action)=>{
            state.loadingActivation = false
            state.activationError = action.payload as string
        })
        builder.addCase(updateAuthCode.pending, (state)=>{
            state.loadingUpdate = true
            state.updateError = null
        })
        builder.addCase(updateAuthCode.fulfilled, (state, action)=>{
            state.loadingUpdate = false
            state.updateError = null
        })
        builder.addCase(updateAuthCode.rejected, (state, action)=>{
            state.loadingUpdate = false
            state.updateError = action.payload as string
        })
    }
})

export default authCodeSlice.reducer;


export const selectAuthCodeFeedback = (state: RootState) => {
    return {
        loading: state.authcode.loadingAuthCodes,
        error: state.authcode.authcodesError,
        data: state.authcode.authcodes
    }
}

export const selectUpdateAuthCodeFeedback = (state: RootState) => {
    return {
        loading: state.authcode.loadingUpdate,
        error: state.authcode.updateError,
    }
}

export const selectActivateAuthCodeFeedback = (state: RootState) => {
    return {
        loading: state.authcode.loadingActivation,
        error: state.authcode.activationError,
    }
}