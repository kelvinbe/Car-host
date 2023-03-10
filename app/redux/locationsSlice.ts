import { getLocalStorage } from './../utils/utils';
import { isUndefined } from 'lodash';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebaseApp';

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        prepareHeaders: async (headers)=> {
            getAuth(app).currentUser?.getIdToken().then((idToken)=>{
                headers.set("Authorization", `Bearer ${idToken}`);
            }).catch(()=>{
                /**
                 * @todo: add log rocket in to pick up on this error
                 */
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