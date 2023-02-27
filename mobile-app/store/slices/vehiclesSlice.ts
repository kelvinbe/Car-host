import { IVehicle } from './../../types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DOMAIN, FETCH_VEHICLES_ENDPOINT } from "../../hooks/constants";
import { auth } from '../../firebase/firebaseApp';
import { createSlice } from '@reduxjs/toolkit';


export const vehiclesApi = createApi({
    reducerPath: "vehiclesApi",
    baseQuery: fetchBaseQuery({ baseUrl: DOMAIN, headers: {
        token: `Bearer ${auth.currentUser?.getIdToken()}`
    } }),
    endpoints: (builder) => ({
        getVehicles: builder.query<IVehicle[], any>({
            query: () => "/api/vehicles",
            transformResponse: (response) => {
                console.log(response)
                return response as any
            },
            transformErrorResponse: (response) => {
                console.log(response)
                return response
            }
        }),
        getVehicle: builder.query<IVehicle, any>({
            query: (id) => `/api/vehicles?id=${id}`,
            transformResponse: (response: any) => {
                const chosen = response?.[0]
                return chosen ? chosen : null
            }
        })
    }),
    
})


export const { useGetVehiclesQuery, useGetVehicleQuery  } = vehiclesApi


const initialState: {
    vehicleData: IVehicle[]
} = {
    vehicleData: []
}



const vehicleDataSlice = createSlice({
    name: "vehicleData",
    initialState,
    reducers: {
        setGetVehicleData:(state, action) => {
            state.vehicleData = action.payload.vehicleData
        }
        
    },
})

export default vehicleDataSlice.reducer;

export const {setGetVehicleData} = vehicleDataSlice.actions

export const selectVehicleData = (state:any) => {state.vehicleData.vehicleData}