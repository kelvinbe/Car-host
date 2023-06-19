import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAnalyticsData, IVehicle } from "../globaltypes";
import { RootState } from ".";
import apiClient from "../utils/apiClient";
import { EARNINGS_API, VEHICLES_DOMAIN } from "../hooks/constants";
import { AxiosError } from "axios";
import LogRocket from "logrocket";
import { fetchReservations } from "./reservationSlice";

export const fetchVehicleList = createAsyncThunk('analytics/fetchVehicleList', async (_, {rejectWithValue})=>{
    try {
        const res = (await apiClient.get(`${VEHICLES_DOMAIN}/list`))
        return res.data
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})

 
export const fetchEarningsData = createAsyncThunk('analytics/fetchEarningsData', async (data: Partial<{
    vehicle_id?: string | "all",
    interval?: 'monthly' | 'yearly',
    year: number,

}>, { rejectWithValue, dispatch })=>{
    try {
        const res = (await apiClient.get(EARNINGS_API, {
            params: {
                ...data
            }
        }))
        const id = data.vehicle_id ?? undefined
        dispatch(fetchChosenVehicle({
            vehicle_id: id === "all" ? undefined : id
        }))
        return res.data
    } 
    catch (e) 
    {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})


export const fetchChosenVehicle = createAsyncThunk('analytics/fetchChosenVehicle', async (data: {
    vehicle_id?: string | "all",
}, {rejectWithValue, dispatch, getState})=>{
    dispatch(selectVehicle(data.vehicle_id))
    try {
        const vehicles = (getState() as RootState).vehicles.vehicles
        const vehicle = vehicles.find(vehicle=>vehicle.id === data.vehicle_id)

        if(vehicle){
            return vehicle
        }
        const fetchedVehicle = (await apiClient.get(VEHICLES_DOMAIN, {
            params: {
                vehicle_id: data.vehicle_id
            }
        }))?.data?.[0] ?? null

        dispatch(fetchReservations({
            vehicle_id: data.vehicle_id ?? undefined
        }))

        return fetchedVehicle
    } catch (e) {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})

interface State {
    vehicle: Partial<IVehicle> | null;
    vehicle_id: string | null;
    interval: 'monthly' | 'yearly';
    fetchVehicleLoading: boolean;
    fetchVehicleError: string | null;
    earningsLoading: boolean;
    earningsError: string | null;
    earnings: Array<Partial<IAnalyticsData>>;
    vehicleListLoading: boolean;
    vehicleListError: string | null;
    vehicle_list: Array<Partial<{
        id: string;
        name: string;
    }>>;
}

const initialState: State = {
    vehicle: null,
    vehicle_id: null,
    interval: 'monthly',
    fetchVehicleLoading: false,
    fetchVehicleError: null,
    earningsLoading: false,
    earningsError: null,
    earnings: [],
    vehicleListLoading: false,
    vehicleListError: null,
    vehicle_list: []
}

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        selectVehicle: (state, action) => {
            state.vehicle_id = action.payload;
        },
        changeInterval: (state, action) => {
            state.interval = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchChosenVehicle.pending, (state, action)=>{
            state.fetchVehicleLoading = true;
            state.fetchVehicleError = null;
        })
        builder.addCase(fetchChosenVehicle.fulfilled, (state, action)=>{
            state.fetchVehicleLoading = false;
            state.fetchVehicleError = null;
            state.vehicle = action.payload;
        })
        builder.addCase(fetchChosenVehicle.rejected, (state, action)=>{
            state.fetchVehicleLoading = false;
            state.fetchVehicleError = action.payload as string;
        })
        builder.addCase(fetchEarningsData.pending, (state, action)=>{
            state.earningsLoading = true;
            state.earningsError = null;
        })
        builder.addCase(fetchEarningsData.fulfilled, (state, action)=>{
            state.earningsLoading = false;
            state.earningsError = null;
            state.earnings = action.payload;
        })
        builder.addCase(fetchEarningsData.rejected, (state, action)=>{
            state.earningsLoading = false;
            state.earningsError = action.payload as string;
        })
        builder.addCase(fetchVehicleList.pending, (state, action)=>{
            state.vehicleListLoading = true;
            state.vehicleListError = null;
        })
        builder.addCase(fetchVehicleList.fulfilled, (state, action)=>{
            state.vehicleListLoading = false;
            state.vehicleListError = null;
            state.vehicle_list = action.payload;
        })
        builder.addCase(fetchVehicleList.rejected, (state, action)=>{
            state.vehicleListLoading = false;
            state.vehicleListError = action.payload as string;
        })
    }
})


export default analyticsSlice.reducer; 

export const { selectVehicle } = analyticsSlice.actions;

export const selectChosenVehicleFeedback = (state: RootState) => {
    return {
        data: state.analytics.vehicle,
        loading: state.analytics.fetchVehicleLoading,
        error: state.analytics.fetchVehicleError,
        id: state.analytics.vehicle_id
    }
}

export const selectEarningsFeedback = (state: RootState) => {
    return {
        data: state.analytics.earnings,
        loading: state.analytics.earningsLoading,
        error: state.analytics.earningsError
    }
}

export const selectVehicleListFeedback = (state: RootState) => {
    return {
        data: state.analytics.vehicle_list,
        loading: state.analytics.vehicleListLoading,
        error: state.analytics.vehicleListError
    }
}