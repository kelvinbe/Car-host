import { IRawPaymentMethodDetails } from './../../types';
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebase/firebaseApp";
import { DOMAIN, PAYMENT_ENDPOINT, PAYMENT_METHOD_ENDPOINT } from "../../hooks/constants";
import { IPaymentMethod } from "../../types";


export const billingApi = createApi({
    reducerPath: "billingApi",
    baseQuery: fetchBaseQuery({
        prepareHeaders: async (headers) => {
            const token = await auth.currentUser?.getIdToken()
            headers.set('token', `Bearer ${token}`)
            headers.set('x-user', 'CUSTOMER')
            return headers
        }
    }),
    endpoints: (builder) => ({
        addPaymentMethod: builder.mutation<any,Partial<{
            type: "card" | "mpesa";
            customer_id: string;
            card_number: string;
            exp_month: number;
            exp_year: number;
            cvc: string;
            mobile_money_number: number
        }>>({
            query: (body) => ({
                url: PAYMENT_METHOD_ENDPOINT,
                method: 'POST',
                body: {
                    ...body,
                    type: undefined
                },
                params: {
                    type: body.type
                }
            })
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
        }),
        confirmPayment: builder.query<{
            timeout: boolean,
            success: boolean,
            error: string
        }, any>({
            query: () => `${PAYMENT_ENDPOINT}/confirm`, // a cookie for the payment session gets set when the user triggers a payment so, we can use that cookie to confirm the payment
            transformResponse: (response: any) => response.data as {
                timeout: boolean,
                success: boolean,
                error: string
            }
        })  
    })
})

export const  { useDeletePaymentMethodMutation, useConfirmPaymentQuery, useAddPaymentMethodMutation } = billingApi

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