import { getLocalStorage } from './../utils/utils';
import { isUndefined } from 'lodash';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api"
    }),
    endpoints: (builder)=>({
        getCurrentLocation: builder.query<any, string>({
            query: (vehicleId)=>({
                url: `/polling/location?vehicleId=${vehicleId}`,
                headers: {
                    token: `Bearer ${getLocalStorage("idToken")}`
                }
            }),
            transformResponse: (response: any) => response.data as any
        })
    })
})

export const { useGetCurrentLocationQuery } = locationsApi;