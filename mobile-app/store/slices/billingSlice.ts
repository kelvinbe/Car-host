import { createSlice } from "@reduxjs/toolkit";

interface CARD {
    cardNum: string,
    cardExp: string,
    cardSec: string,
    paymentTyp: 'MC' | 'Visa' | 'Discover' | 'AMEX'
}

interface PAYPAL {
    email: string
}

interface MPESA {
    phone: string
}

type CASH = boolean 

interface PAYMENT_METHODS {
    cards: CARD[],
    paypal: PAYPAL,
    mpesa: MPESA,
    cash: CASH
}

const initialState: {
    availablePaymentMethods: PAYMENT_METHODS | {},
    selectedPaymentMethod: string,
    selectedPaymentMethodId?: string,
} = {
    availablePaymentMethods: {},
    selectedPaymentMethod: "",
    selectedPaymentMethodId: ""
}

const billingSlice = createSlice({
    name: "billingSlice",
    initialState: initialState,
    reducers: {
        setAvailablePaymentMethods: (state, action) => {
            state.availablePaymentMethods = action.payload.availablePaymentMethods
        },
        setSelectedPaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload.selectedPaymentMethod
        },
        setSelectedPaymentMethodId: (state, action) => {
            state.selectedPaymentMethodId = action.payload.selectedPaymentMethodId
        }
    }
})

export default billingSlice.reducer;

// actions
export const {
    setAvailablePaymentMethods,
    setSelectedPaymentMethod,
    setSelectedPaymentMethodId
} = billingSlice.actions;

// selectors
export const selectAvailableMethods = (state: any) => state.availablePaymentMethods;
export const selectedPaymentMethod = (state: any) => state.selectedPaymentMethod;
export const selectedPaymentMethodId = (state: any) => state.selectedPaymentMethodId;