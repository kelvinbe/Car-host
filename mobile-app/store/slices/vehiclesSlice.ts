import { IVehicle } from './../../types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DOMAIN, FETCH_VEHICLES_ENDPOINT } from "../../hooks/constants";
import { auth } from '../../firebase/firebaseApp';


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