import { DOMAIN, FETCH_HISTORY_ENDPOINT } from './../../hooks/constants';
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
        baseUrl: DOMAIN,
        headers: {
            token: `Bearer ${auth.currentUser?.getIdToken()}`
        }
    }),
    endpoints: (builder) => ({
        getHistory: builder.query<IReservation[], any>({
            query: ()=> `/api/history`,
            transformResponse: (response: any) => {
                console.log(response)
                return response
            }
        }),
        
    })
})

export const {useGetHistoryQuery} = historyApi;

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {},
})

export default historySlice.reducer;

