import { IRawPaymentMethodDetails } from './../../types';
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebase/firebaseApp";
import { DOMAIN } from "../../hooks/constants";
import { IPaymentMethod } from "../../types";


export const billingApi = createApi({
    reducerPath: "billingApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: DOMAIN,
        headers: {
            token: `Bearer ${auth.currentUser?.getIdToken()}`
        }
    }),
    endpoints: (builder) => ({
        getPaymentMethods: builder.query<IPaymentMethod<any>[], any>({
            query: () => "/api/paymentMethods",
            transformResponse: (response: any) => {
                console.log(response)
                return response
            }
        }),
        setPaymentMethod: builder.mutation<any, IRawPaymentMethodDetails<any>>({
            query: (body) => ({
                url: "/api/paymentMethods",
                method: "POST",
                body
            })
        }),
        deletePaymentMethod: builder.mutation<any, string>({
            query: (id) => ({
                url: `/api/paymentMethods?id=${id}`,
                method: "DELETE",
            })
        })
    })
})

export const  { useDeletePaymentMethodMutation, useGetPaymentMethodsQuery, useSetPaymentMethodMutation } = billingApi

// interface CARD {
//     cardNum: string,
//     cardExp: string,
//     cardSec: string,
//     paymentTyp: 'MC' | 'Visa' | 'Discover' | 'AMEX'
// }

// interface PAYPAL {
//     email: string
// }

// interface MPESA {
//     phone: string
// }

// type CASH = boolean 

// interface PAYMENT_METHODS {
//     cards: CARD[],
//     paypal: PAYPAL,
//     mpesa: MPESA,
//     cash: CASH
// }

// const initialState: {
//     availablePaymentMethods: PAYMENT_METHODS | {},
//     selectedPaymentMethod: string,
//     selectedPaymentMethodId?: string,
// } = {
//     availablePaymentMethods: {},
//     selectedPaymentMethod: "",
//     selectedPaymentMethodId: ""
// }

// const billingSlice = createSlice({
//     name: "billingSlice",
//     initialState: initialState,
//     reducers: {
//         setAvailablePaymentMethods: (state, action) => {
//             state.availablePaymentMethods = action.payload.availablePaymentMethods
//         },
//         setSelectedPaymentMethod: (state, action) => {
//             state.selectedPaymentMethod = action.payload.selectedPaymentMethod
//         },
//         setSelectedPaymentMethodId: (state, action) => {
//             state.selectedPaymentMethodId = action.payload.selectedPaymentMethodId
//         }
//     }
// })

// export default billingSlice.reducer;

// // actions
// export const {
//     setAvailablePaymentMethods,
//     setSelectedPaymentMethod,
//     setSelectedPaymentMethodId
// } = billingSlice.actions;

// // selectors
// export const selectAvailableMethods = (state: any) => state.availablePaymentMethods;
// export const selectedPaymentMethod = (state: any) => state.selectedPaymentMethod;
// export const selectedPaymentMethodId = (state: any) => state.selectedPaymentMethodId;