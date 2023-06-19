import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IVehicle, PaginationSupportState, asyncThinkFetchParams } from "../globaltypes";
import apiClient from "../utils/apiClient";
import { VEHICLES_DOMAIN } from "../hooks/constants";
import LogRocket from "logrocket";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (args: Partial<asyncThinkFetchParams<IVehicle>> | undefined | null = null, { rejectWithValue, dispatch, getState }) =>{
    const currentParams = (getState() as RootState).vehicles
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
        const res = (await apiClient.get(VEHICLES_DOMAIN, {
            params
        }))
        return res.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})


export const fetchVehicle = createAsyncThunk('vehicles/fetchVehicle', async (data: {
    vehicle_id?: string,
}, { rejectWithValue }) =>{
    try {
        const res = (await apiClient.get(VEHICLES_DOMAIN, {
            params: {
                ...data
            }
        }))
        return res?.data?.[0] ?? null
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})


export const updateVehicle = createAsyncThunk('vehicles/updateVehicle', async (data: Partial<IVehicle>, {rejectWithValue, dispatch}) =>{
    dispatch(
        setActiveVehicleId(data.id)
    )
    try {
        const res = (await apiClient.patch(VEHICLES_DOMAIN, {
            ...data
        }, {
            params: {
                vehicle_id: data.id
            }
        }))

        dispatch(fetchVehicles())

        return res.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})

export const addVehicle = createAsyncThunk('vehicles/addVehicle', async (data: Partial<IVehicle>, {rejectWithValue, dispatch}) =>{
    try {
        const res = (await apiClient.post(VEHICLES_DOMAIN, {
            vehicle: {
                ...data
            },
            pictures: data?.pictures ?? []
        }))

        dispatch(fetchVehicles())

        return res.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})

interface VehiclesReducerState extends Partial<PaginationSupportState> {
    vehicles: Partial<IVehicle>[],
    fetchVehiclesLoading: boolean,
    fetchVehiclesError: null | string,
    fetchVehicleLoading: boolean,
    fetchVehicleError: null | string, 
    vehicle: Partial<IVehicle> | null,
    updateVehicleLoading: boolean,
    updateVehicleError: null | string,
    active_updating_vehicle_id?: string,
    addVehicleLoading: boolean,
    addVehicleError: null | string,
}


const vehicles:IVehicle[] = []
const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: vehicles,
        fetchVehiclesLoading: false,
        fetchVehiclesError: null,
        current_page: 1,
        current_size: 10,
    } as VehiclesReducerState,
    reducers: {
        getVehicles(state, action){
            state.vehicles= action.payload;
        },
        updateParams: (state, action)=>{
            state.current_page = action.payload.page ?? state.current_page
            state.current_size = action.payload.size ?? state.current_size
            state.current_search = action.payload.search ?? state.current_search
            state.current_sort = action.payload.sort ?? state.current_sort
        },
        setActiveVehicleId: (state, action)=>{
            state.active_updating_vehicle_id = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchVehicles.pending, state=>{
            state.fetchVehiclesLoading = true
            state.fetchVehiclesError = null
        })
        builder.addCase(fetchVehicles.fulfilled, (state, action)=>{
            state.fetchVehiclesLoading = false
            state.vehicles = action.payload
        })
        builder.addCase(fetchVehicles.rejected, (state, action)=>{
            state.fetchVehiclesLoading = false 
            state.fetchVehiclesError = action.payload  as string
        })
        builder.addCase(fetchVehicle.pending, state=>{
            state.fetchVehicleLoading = true
            state.fetchVehicleError = null
        })
        builder.addCase(fetchVehicle.fulfilled, (state, action)=>{
            state.fetchVehicleLoading = false
            state.vehicle = action.payload
        })
        builder.addCase(fetchVehicle.rejected, (state, action)=>{
            state.fetchVehicleLoading = false 
            state.fetchVehicleError = action.payload  as string
        })
        builder.addCase(updateVehicle.pending, state=>{
            state.updateVehicleLoading = true
            state.updateVehicleError = null
        })
        builder.addCase(updateVehicle.fulfilled, (state, action)=>{
            state.updateVehicleLoading = false
            state.vehicle = action.payload
            state.active_updating_vehicle_id = undefined
        })
        builder.addCase(updateVehicle.rejected, (state, action)=>{
            state.updateVehicleLoading = false 
            state.updateVehicleError = action.payload  as string
        })
        builder.addCase(addVehicle.pending, state=>{
            state.addVehicleLoading = true
            state.addVehicleError = null
        })
        builder.addCase(addVehicle.fulfilled, (state, action)=>{
            state.addVehicleLoading = false
            state.addVehicleError = null
        })
        builder.addCase(addVehicle.rejected, (state, action)=>{
            state.addVehicleLoading = false 
            state.addVehicleError = action.payload  as string
        })
    }
})
export default vehiclesSlice.reducer;

export const selectVehicles = (state: RootState)=>state.vehicles.vehicles
export const { getVehicles, updateParams, setActiveVehicleId } = vehiclesSlice.actions;

export const selectFetchVehiclesFeedback = (state: RootState)=>{
    return {
        loading: state.vehicles.fetchVehiclesLoading,
        error: state.vehicles.fetchVehiclesError,
        data: state.vehicles.vehicles
    }
}

export const selectFetchVehicleFeedback = (state: RootState) => {
    return {
        loading: state.vehicles.fetchVehicleLoading,
        error: state.vehicles.fetchVehicleError,
        data: state.vehicles.vehicle
    }
}

export const selectVehiclesPaginationState = (state: RootState) => {
    return {
        current_page: state.vehicles.current_page,
        current_size: state.vehicles.current_size,
        current_search: state.vehicles.current_search,
        current_sort: state.vehicles.current_sort
    }
}

export const selectUpdateVehicleFeedback = (state: RootState) => {
    return {
        loading: state.vehicles.updateVehicleLoading,
        error: state.vehicles.updateVehicleError,
        data: state.vehicles.vehicle,
        id : state.vehicles.active_updating_vehicle_id
    }
}

export const selectAddVehicleFeedback = (state: RootState) => {
    return {
        loading: state.vehicles.addVehicleLoading,
        error: state.vehicles.addVehicleError,
    }
}