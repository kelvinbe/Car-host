import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IVehicle } from "../globaltypes";
import apiClient from "../utils/apiClient";
import { VEHICLES_DOMAIN } from "../hooks/constants";

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (data: {
    page?: number,
    size?: number,
}, { rejectWithValue }) =>{
    try {
        const res = (await apiClient.get(VEHICLES_DOMAIN, {
            params: {
                ...data
            }
        }))
        console.log("Here is the res::", res)
        return res.data
    } catch (e) {
        rejectWithValue(e as string)
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
        console.log("Here is the res::", res)
        return res?.data ?? null
    } catch (e) {
        rejectWithValue(e as string)
    }
})

interface VehiclesReducerState {
    vehicles: Partial<IVehicle>[],
    fetchVehiclesLoading: boolean,
    fetchVehiclesError: null | string,
    fetchVehicleLoading: boolean,
    fetchVehicleError: null | string, 
    vehicle: Partial<IVehicle> | null
}


const vehicles:IVehicle[] = []
const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: vehicles,
        fetchVehiclesLoading: false,
        fetchVehiclesError: null,
    } as VehiclesReducerState,
    reducers: {
        getVehicles(state, action){
            state.vehicles= action.payload;
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
    }
})

export const selectVehicles = (state: RootState)=>state.vehicles.vehicles
export const { getVehicles } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;

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