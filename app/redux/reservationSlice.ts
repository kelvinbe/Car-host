import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IReservation, IStation, IUserProfile, IVehicle, PaginationSupportState, asyncThinkFetchParams } from "../globaltypes";
import { RootState } from ".";
import apiClient from "../utils/apiClient";
import { RESERVATION_DOMAIN } from "../hooks/constants";
import LogRocket from "logrocket";
import { isEmpty } from "lodash";



export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (args: Partial<asyncThinkFetchParams> | null | undefined = null, { rejectWithValue, dispatch, getState })=> {
    const currentParams = (getState() as RootState).reservations
    const prev_search = isEmpty(currentParams.current_search) ? undefined : currentParams.current_search
    const current_search = isEmpty(args?.search) ? prev_search : args?.search
    const search = isEmpty(current_search) ? undefined : current_search
    const params = {
        page: args?.page ?? currentParams.current_page,
        size: args?.size ?? currentParams.current_size,
        search: search,
        sort: args?.sort ?? currentParams.current_sort
    }
    dispatch(updateParams(params))
    try {
        const res = (await apiClient.get(RESERVATION_DOMAIN, {
            params
        }))
        return res.data
    } catch(e) {
        LogRocket.error(e)
        rejectWithValue(e as string)
    }
})

export const updateReservation = createAsyncThunk('reservations/updateReservation', async (data: Partial<IReservation>, {rejectWithValue, dispatch})=>{
    try {
        const res = (await apiClient.patch(RESERVATION_DOMAIN, {
            ...data
        }, {
            params: {
                reservation_id: data.id
            }
        }))

        dispatch(fetchReservations())

        return res.data
    } catch(e) {
        LogRocket.error(e)
        return rejectWithValue(e as string)
    }
})

const reservations: IReservation[] = []
const reservationsSlice = createSlice({
    name: 'reservations',
    initialState: {
        reservations: reservations,
        fetchReservationsLoading: false,
        fetchReservationsError: null,
        updateReservationLoading: false,
        updateReservationError: null,
        current_page: 1,
        current_size: 10,
    } as {
        reservations: Partial<IReservation>[] & Partial<{
            vehicle: Partial<IVehicle> & {
                host: Partial<IUserProfile>,
                station: Partial<IStation>
            },
            user: Partial<IUserProfile>
        }>,
        fetchReservationsLoading: boolean,
        fetchReservationsError: null | string,
        updateReservationLoading: boolean,
        updateReservationError: null | string,
        active_reservation_id?: string
    } & Partial<PaginationSupportState>,
    reducers: {
        getReservations(state, action){
            state.reservations= action.payload;
        },
        updateParams(state, action){
            state.current_page = action.payload.page
            state.current_size = action.payload.size
            state.current_search = action.payload.search
            state.current_sort = action.payload.sort
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReservations.pending, (state, action)=>{
            state.fetchReservationsLoading = true
            state.fetchReservationsError = null
        })
        builder.addCase(fetchReservations.fulfilled, (state, action)=>{
            state.fetchReservationsLoading = false
            state.fetchReservationsError = null
            state.reservations = action.payload
        })
        builder.addCase(fetchReservations.rejected, (state, action)=>{
            state.fetchReservationsLoading = false
            state.fetchReservationsError = action.payload as string
        })
        builder.addCase(updateReservation.pending, (state, action)=>{
            state.updateReservationLoading = true
            state.updateReservationError = null
        })
        builder.addCase(updateReservation.fulfilled, (state, action)=>{
            state.updateReservationLoading = false
            state.updateReservationError = null
        })
        builder.addCase(updateReservation.rejected, (state, action)=>{
            state.updateReservationLoading = false
            state.updateReservationError = action.payload as string
        })
    }
})

export const selectReservations = (state: RootState)=>state.reservations.reservations
export const { getReservations, updateParams } = reservationsSlice.actions;
export default reservationsSlice.reducer;

export const selectReservationsFeedback = (state: RootState)=>({
    loading: state.reservations.fetchReservationsLoading,
    error: state.reservations.fetchReservationsError,
    data: state.reservations.reservations
})

export const selectUpdateReservationFeedback = (state: RootState)=>({
    loading: state.reservations.updateReservationLoading,
    error: state.reservations.updateReservationError,
    active_reservation_id: state.reservations.active_reservation_id
})


export const selectReservationsPaginationState = (state: RootState)=>({
    current_page: state.reservations.current_page,
    current_size: state.reservations.current_size,
    current_search: state.reservations.current_search,
    current_sort: state.reservations.current_sort
})




