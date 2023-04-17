import { DOMAIN, FETCH_HISTORY_ENDPOINT, RESERVATIONS_ENDPOINT } from './../../hooks/constants';
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from '../../firebase/firebaseApp';
import { IReservation } from '../../types';



const initialState: {
    history: IReservation[]
} = {
    history: []
}

export const historyApi = createApi({
    reducerPath: "historyApi",
    baseQuery: fetchBaseQuery({
        headers: {
            token: `Bearer ${auth.currentUser?.getIdToken()}`
        }
    }),
    endpoints: (builder) => ({
        getHistory: builder.query<IReservation[], any>({
            query: ()=> ({
                url: RESERVATIONS_ENDPOINT,
                method: "GET",
                params: {
                    status: "COMPLETE"
                }
            }),
            transformResponse: (response: any) => {
                return response.data
            }
        }),
        
    })
})

export const {useGetHistoryQuery} = historyApi;

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setGetHistoryReservations:(state, action) => {
            state.history = action.payload.history
        }
        
    },
})

export default historySlice.reducer;

export const {setGetHistoryReservations} = historySlice.actions

export const selectHistory = (state:any) => {state.history.history}