import { IRawPaymentMethodDetails } from './../../types';
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../../firebase/firebaseApp";
import { PAYMENT_ENDPOINT, PAYMENT_METHOD_ENDPOINT } from "../../hooks/constants";


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
            type: string; // the types keep changing so, we can't use an enum here
            customer_id: string;
            card_number: string;
            exp_month: number;
            exp_year: number;
            cvc: string;
            phone_number: number
        }>>({
            query: (body) => ({
                url: PAYMENT_METHOD_ENDPOINT,
                method: 'POST',
                body: {
                    ...body,
                },
                params: {
                    type: body.type
                }
            }),
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
        confirmPayment: builder.query<boolean, {
            authorization: string
        }>({
            query: (data) => ({
                url: `${PAYMENT_ENDPOINT}/confirm`,
                method: "GET",
                headers: {
                    "x-payment-authorization": data.authorization,
                }
            }), // a cookie for the payment session gets set when the user triggers a payment so, we can use that cookie to confirm the payment
            transformResponse: (response: any) => response.data as boolean
        })  
    })
})

export const  { useDeletePaymentMethodMutation, useConfirmPaymentQuery, useAddPaymentMethodMutation } = billingApi