import { getLocalStorage } from './../utils/utils';
import { isUndefined } from 'lodash';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseApp';
import { createSlice } from "@reduxjs/toolkit";
import { ILocation } from "../globaltypes";
import { RootState } from ".";
import LogRocket from 'logrocket';
const locations:ILocation[] = []
const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: locations,
    },
    reducers: {
        getLocations(state, action){
            state.locations= action.payload;
        },
    }
})

export const selectLocations = (state: RootState)=>state.locations.locations
export const { getLocations } = locationsSlice.actions;
export default locationsSlice.reducer;

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: async (headers)=> {
            getAuth(app).currentUser?.getIdToken().then((idToken)=>{
                headers.set("Authorization", `Bearer ${idToken}`);
            }).catch((error)=>{
                LogRocket.error(error)
            })
        }
    }),
    endpoints: (builder)=>({
        getCurrentLocation: builder.query<any, string>({
            query: (vehicleId)=>({
                url: `/polling/location?vehicleId=${vehicleId}`,
            }),
            transformResponse: (response: any) => response.data as any
        })
    })
})

export const { useGetCurrentLocationQuery } = locationsApi;