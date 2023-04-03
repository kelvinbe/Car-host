import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IStation } from "../globaltypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { http_methods, STATIONS_API } from "../hooks/constants";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseApp";


export const stationsApi = createApi({
    reducerPath: 'stationsApi',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers, {getState}) => {
            getAuth(app).currentUser?.getIdToken().then((token)=>{
                headers.set('Authorization', `Bearer ${token}`)
                headers.set('x-user', 'HOST')
            }).catch((e)=>{
                console.log(e)
                /**
                 * @todo add logic to handle error {logrocket}
                 */
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
        getStations: builder.query<any, any>({
            query: (body) => ({
                url: STATIONS_API,
                method: http_methods.get,
                body: body
            })
        })
    })
})

export const { useAddStationMutation, useUpdateStationMutation, useGetStationsQuery } = stationsApi


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