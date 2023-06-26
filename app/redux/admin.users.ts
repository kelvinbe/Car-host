import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserProfile, PaginationSupportState, asyncThinkFetchParams } from "../globaltypes";
import { RootState } from ".";
import { isEmpty } from "lodash";
import { AxiosError } from "axios";
import LogRocket from "logrocket";
import apiClient from "../utils/apiClient";
import { ADMIN_BASE_ENDPOINT } from "../hooks/constants";


export const fetchAllUsers = createAsyncThunk("allUsers/fetchAllUsers", async (args: Partial<asyncThinkFetchParams> | undefined | null = null, { rejectWithValue, dispatch, getState }) => {
    const currentParams = (getState() as RootState).allUsers
    const prev_search = isEmpty(currentParams.current_search) ? undefined : currentParams.current_search
    const current_search = isEmpty(args?.search) ? prev_search : args?.search
    const search = isEmpty(current_search) ? undefined : current_search === "__empty__" ? undefined : current_search
    const params = args?.reset ? {
        page: 1,
        size: 10,
    } : {
        page: args?.page ?? currentParams.current_page,
        size: args?.size ?? currentParams.current_size,
        search: search,
        sort: args?.sort ?? currentParams.current_sort,
        sort_by: args?.sort_by ?? currentParams.current_sort_by ?? undefined
    }
    dispatch(updateParams(params))

    try {
        const data = (await apiClient.get(`${ADMIN_BASE_ENDPOINT}/users`, { params })).data 

        return data
    } 
    catch (err) 
    {
        LogRocket.error(err)
        return rejectWithValue((err as AxiosError)?.response?.data)
    }
})


interface AllUsersState extends Partial<PaginationSupportState> {
    users: Array<Partial<IUserProfile & {
        agg: {
            vehicles: number
            reservations: number 
        }
    }>>
    loadingUsers: boolean
    errorLoadingUsers: boolean
    loadingUser: boolean
    errorLoadingUser: boolean
    user: any
}

const initialState: AllUsersState = {
    users: [],
    loadingUsers: false,
    errorLoadingUsers: false,
    loadingUser: false,
    errorLoadingUser: false,
    user: null,
}

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
        updateParams(state, action) {
            state.current_page = action.payload.current_page
            state.current_search = action.payload.current_search
            state.current_size = action.payload.current_size
            state.current_sort = action.payload.current_sort
            state.current_sort_by = action.payload.current_sort_by
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAllUsers.pending, (state, action) => {
            state.loadingUsers = true
            state.errorLoadingUsers = false
        })
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loadingUsers = false
            state.errorLoadingUsers = false
            state.users = action.payload ?? []
        })
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loadingUsers = false
            state.errorLoadingUsers = true
        })
    }
})

export const { updateParams } = allUsersSlice.actions

export default allUsersSlice.reducer

export const selectAllUsersFeedback = (state: RootState) => {
    const data = state.allUsers

    return {
        loading: data.loadingUsers,
        error: data.errorLoadingUsers,
        data: data.users,
    }
}

export const selectAllUsersPaginationState = (state: RootState) => {
    const data = state.allUsers

    return {
        current_page: data.current_page,
        current_search: data.current_search,
        current_size: data.current_size,
        current_sort: data.current_sort,
        current_sort_by: data.current_sort_by,
    }
}