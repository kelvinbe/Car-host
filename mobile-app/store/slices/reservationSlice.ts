import { IAPIDto, IReservation } from './../../types';
import { DOMAIN, FETCH_RESERVATIONS_ENDPOINT } from './../../hooks/constants';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase/firebaseApp';


export const reservationsApi = createApi({
    reducerPath: "reservationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: DOMAIN,
        headers: {
            token: `Bearer ${auth.currentUser?.getIdToken()}`
        }
    }),
    endpoints: (builder) => ({
        getReservations: builder.query<IReservation[], any>({
            query: () => `/api/reservations`,
            transformResponse: (response: any) => {
                console.log(response)
                return response
            }  
        }),
        getReservation: builder.query<IReservation, string>({
            query: (id: string) => `/api/reservations?id=${id}`,
            transformResponse: (response: any) => {
                // this will use the same handler on as the getReservations endpoint on the backend,
                // the handler will combine all the info related to the reservation and return it as a single object
                const chosen = response?.[0]
                const data = chosen ? {
                    ...chosen
                } : null
                return data
            }
        }),
        addReservation: builder.mutation<IAPIDto<{reservationId: string}>, IReservation>({
            query: (body) => ({
                url: `/api/reservation`,
                method: 'POST',
                body
            }),
            transformResponse: (response: any) => {
                return response
            }
        }),
        updateBooking: builder.mutation<IAPIDto<{reservationId: string}>, IReservation>({
            query: (body) => ({
                url: `/api/reservation`,
                method: 'PUT',
                body
            }),
            transformResponse: (response: any) => {
                return response
            }
        })
    })
})

export const { useGetReservationsQuery, useGetReservationQuery, useAddReservationMutation, useUpdateBookingMutation } = reservationsApi

interface IReservationState {
    chosenReservation?: string
}

const initialState: IReservationState = {
    chosenReservation: undefined
}

const reservationSlice = createSlice({
    name: 'reservationSlice',
    initialState,
    reducers: {
        setChosenReservation: (state, action) => {
            state.chosenReservation = action.payload;
        },
    }
})

export default reservationSlice.reducer;

// actions

export const { setChosenReservation } = reservationSlice.actions;

// selectors
export const selectChosenReservation = (state: any) => state.reservation.chosenReservation;