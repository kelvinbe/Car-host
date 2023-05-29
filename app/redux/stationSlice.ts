import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IStation } from "../globaltypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { http_methods, STATIONS_API } from "../hooks/constants";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseApp";
import LogRocket from 'logrocket';

export const stationsApi = createApi({
    reducerPath: 'stationsApi',
    baseQuery: fetchBaseQuery({
        prepareHeaders: async (headers, {getState}) => {
            await getAuth(app).currentUser?.getIdToken().then((token)=>{
                headers.set('Authorization', `Bearer ${token}`)
                headers.set('x-user', 'HOST')
                headers.set("ngrok-skip-browser-warning", "true")
            }).catch((e)=>{
                LogRocket.error(e)
            })
        }
    }),
    endpoints: (builder) => ({
        addStation: builder.mutation<any, any>({
            query: (data) => ({
                url: STATIONS_API,
                method: http_methods.post,
                body: data,

            })
        }),
        updateStation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${STATIONS_API}?station_id=${data.station_id}`,
                method: http_methods.patch,
                body: data
            })
        }),
        getStations: builder.query<Array<Partial<IStation>>, any>({
            query: () => ({
                url: STATIONS_API,
                method: http_methods.get
            }),
            transformResponse: (response: any)=>{
                return response.data
            }
        }),
        deleteStation: builder.mutation<any, any>({
            query: (id: string)=>{
                return {
                    url: STATIONS_API,
                    method: http_methods.delete,
                    params: {
                        station_id: id
                    },
                }
            }
        })
    })
})

export const { useAddStationMutation, useUpdateStationMutation, useGetStationsQuery, useDeleteStationMutation } = stationsApi


const stations:IStation[] = []
const stationSlice = createSlice({
    name: 'stations',
    initialState: {
        stations: stations,
    },
    reducers: {
        getStations(state, action){
            state.stations= action.payload;
        }
    }
})

export const selectStations = (state: RootState)=>state.stations.stations
export const { getStations } = stationSlice.actions;
export default stationSlice.reducer;