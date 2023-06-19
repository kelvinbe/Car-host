import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IStation, PaginationSupportState, asyncThinkFetchParams } from "../globaltypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { http_methods, STATIONS_API, STATION_API } from "../hooks/constants";
import LogRocket from 'logrocket';
import apiClient, { db_user } from "../utils/apiClient";
import { isEmpty } from "lodash";
import store from "./store";


export const fetchStations = createAsyncThunk('stations/fetchStations', async (args: Partial<asyncThinkFetchParams<IStation>> | undefined | null = null, { rejectWithValue, dispatch, getState })=>{
    const currentParams = (getState() as RootState).stations
    const prev_search = isEmpty(currentParams.current_search) ? undefined : currentParams.current_search
    const current_search = isEmpty(args?.search) ? prev_search : args?.search
    const search = isEmpty(current_search) ? undefined : current_search === "__empty__" ? undefined : current_search
    const params = args?.reset ? {
        page: 1,
        size: 10,
    } : {
        page: args?.page ?? currentParams.current_page,
        size: args?.size ?? currentParams.current_size,
        search: search === "__empty__" ? undefined : search,
        sort: args?.sort ?? currentParams.current_sort,
        sort_by: args?.sort_by ?? currentParams.current_sort_by ?? undefined
    }
    dispatch(updateParams(params))
    try {
        const res = (await apiClient.get(STATIONS_API, {
            params
        }))
        return res.data
    } catch(e) 
    {
        LogRocket.error(e)
        rejectWithValue(e as string)
    }

})


export const updateStations = createAsyncThunk('stations/updateStations', async (data: Partial<IStation>, {rejectWithValue, dispatch})=>{
    dispatch(
        setActiveStationId(data.id)
    )
    try {
        const res = (await apiClient.patch(STATION_API, {
            ...data
        }, {
            params: {
                station_id: data.id
            }
        }))

        dispatch(fetchStations())

        return res.data
    } catch(e) {
        LogRocket.error(e)
        return rejectWithValue(e as string)
    }
})

export const stationsApi = createApi({
    reducerPath: 'stationsApi',
    baseQuery: fetchBaseQuery({
        prepareHeaders: async (headers, {getState}) => {
            const user = await db_user.getUser()
            await user?.getIdToken().then((token)=>{
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
                url: STATION_API,
                method: http_methods.post,
                body: data,

            }),
            transformResponse: (response: any)=>{
                store.dispatch(fetchStations())
                return response.data
            }
        }),
        updateStation: builder.mutation<any, any>({
            query: (data) => ({
                url: `${STATION_API}?station_id=${data.station_id}`,
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
                    url: STATION_API,
                    method: http_methods.put,
                    params: {
                        station_id: id
                    },
                    body: {
                        status: "INACTIVE"
                    }
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
        current_page: 1,
        current_size: 10,
        current_search: "",
        fetchStationsError: null,
        fetchStationsLoading: false,
        updateStationError: null,
        updateStationLoading: false,
    } as {
        stations: IStation[],
        fetchStationsError: null | string,
        fetchStationsLoading: boolean,
        updateStationError: null | string,
        updateStationLoading: boolean,
        active_station_id?: string
    } & Partial<PaginationSupportState<IStation>>,
    reducers: {
        getStations(state, action){
            state.stations= action.payload;
        },
        updateParams(state, action){
            state.current_page = action.payload.page
            state.current_size = action.payload.size
            state.current_search = action.payload.search
            state.current_sort = action.payload.sort
        },
        setActiveStationId(state, action){
            state.active_station_id = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStations.pending, (state, action)=>{
            state.fetchStationsLoading = true
        })
        builder.addCase(fetchStations.fulfilled, (state, action)=>{
            state.fetchStationsLoading = false
            state.stations = action.payload
        })
        builder.addCase(fetchStations.rejected, (state, action)=>{
            state.fetchStationsLoading = false
            state.fetchStationsError = action.error.message ?? null
        })
        builder.addCase(updateStations.fulfilled, (state, action)=>{
            state.updateStationError = null
            state.updateStationLoading = false
        })
        builder.addCase(updateStations.rejected, (state, action)=>{
            state.updateStationError = action.error.message ?? null
            state.updateStationLoading = false
        })
        builder.addCase(updateStations.pending, (state, action)=>{
            state.updateStationError = null
            state.updateStationLoading = true
        })
    }
})

const reducer = stationSlice.reducer;
export default reducer

export const selectStations = (state: RootState)=>state.stations.stations
export const { getStations, updateParams, setActiveStationId } = stationSlice.actions;


export const selectStationsFeedback = (state: RootState)=>({
    loading: state.stations.fetchStationsLoading,
    error: state.stations.fetchStationsError,
    data: state.stations.stations
})

export const selectUpdateStationFeedback = (state: RootState)=>({
    loading: state.stations.updateStationLoading,
    error: state.stations.updateStationError,
    id: state.stations.active_station_id
})


export const selectStationsPaginationState = (state: RootState)=>({
    page: state.stations.current_page,
    size: state.stations.current_size,
    search: state.stations.current_search,
    sort: state.stations.current_sort
})