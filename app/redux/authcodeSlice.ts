import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { IAuthCode, IUserProfile, IVehicle, asyncThinkFetchParams } from "../globaltypes";
import apiClient from "../utils/apiClient";
import { AUTHCODE_DOMAIN } from "../hooks/constants";
import {AxiosError} from "axios";
import { RootState } from ".";
import LogRocket from "logrocket";
import { isEmpty } from "lodash";





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
    current_page?: number;
    current_size?: number;
    current_search?: string;
    current_sort?: string;
}

const initialState: ReducerState = {
    loadingAuthCodes: false,
    authcodesError: null,
    authcodes: [],
    loadingActivation: false,
    activationError: null,
    loadingUpdate: false,
    updateError: null,
    current_page: 1,
    current_size: 10
}

export const fetchAuthCodes = createAsyncThunk('authcodes/fetchAuthCodes', async (args: Partial<asyncThinkFetchParams<IAuthCode>> | null | undefined = null,{rejectWithValue, getState, dispatch})=>{
    try {

        const currentParams = (getState() as RootState).authcode

        const prev_search = isEmpty(currentParams.current_search) ? undefined : currentParams.current_search
        const current_search = isEmpty(args?.search) ? prev_search : args?.search
        const search = isEmpty(current_search) ? undefined : current_search === "__empty__" ? undefined : current_search

        const params = {
            page: args?.page ?? currentParams.current_page,
            size: args?.size ?? currentParams.current_size,
            search: search,
            sort: args?.sort ?? currentParams.current_sort,
            sort_by: args?.sort_by ?? currentParams.current_sort ?? undefined
        }

        dispatch(updateParams(params))
        const authcodes = (await apiClient.get(AUTHCODE_DOMAIN, {
            params
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
        updateParams: (state, action)=>{
            state.current_page = action.payload.page ?? state.current_page
            state.current_size = action.payload.size ?? state.current_size
            state.current_search = action.payload.search ?? state.current_search
            state.current_sort = action.payload.sort ?? state.current_sort
        }
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

export const {
    updateParams
} = authCodeSlice.actions


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

export const selectPaginationState = (state: RootState) => {
    return {
        current_page: state.authcode.current_page,
        current_size: state.authcode.current_size,
        current_search: state.authcode.current_search,
        current_sort: state.authcode.current_sort
    }
}