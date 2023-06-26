import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserProfile } from "../globaltypes";
import { AxiosError } from "axios";
import LogRocket from "logrocket";
import apiClient from "../utils/apiClient";
import { ADMIN_BASE_ENDPOINT } from "../hooks/constants";
import { RootState } from ".";


interface IEmulationUser {
    id: string,
    type: 'email' | 'user_id' | 'handle' | 'uid'
}

export const fetchEmulationUser = createAsyncThunk('emulation/fetchEmulationUser', async (args: IEmulationUser, { rejectWithValue, dispatch }) => {
    try {
        const data = (await apiClient.get(`${ADMIN_BASE_ENDPOINT}/user`, {
            params: {
                [args.type]: args.id
            }
        })).data
        dispatch(setCurrentIdType(args.type))
        return data
    } catch (err) {
        LogRocket.error(err)
        return rejectWithValue((err as AxiosError)?.response?.data ?? "Something went wrong")
    }
})


interface IState {
    user: Partial<IUserProfile> | null
    loading: boolean
    error: string | null
    user_id?: string 
    current_id_type: 'email' | 'user_id' | 'handle' | 'uid' 
}


const initialState: IState = {
    user: null,
    loading: false,
    error: null,
    current_id_type: 'email'
}

const emulationSlice = createSlice({
    name: 'emulation',
    initialState,
    reducers: {
        setCurrentIdType: (state, action) => {
            state.current_id_type = action.payload
        },
        clearEmulation: (state) => {
            state.user = null
            state.loading = false
            state.error = null
            state.user_id = undefined
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchEmulationUser.pending, (state, action) => {
            state.loading = true
            state.error = null
            state.user = null
            state.user_id = action.meta.arg.id
        })
        builder.addCase(fetchEmulationUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload
            state.user_id = action.payload?.id
        })
        builder.addCase(fetchEmulationUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
            state.user = null
        })
    }
})

export default emulationSlice.reducer

export const { setCurrentIdType, clearEmulation } = emulationSlice.actions

export const selectEmulationFeedback = (state: RootState) => {
    return {
        loading: state.emulation.loading,
        error: state.emulation.error,
        data: state.emulation.user,
        user_id: state.emulation.user_id
    }
}