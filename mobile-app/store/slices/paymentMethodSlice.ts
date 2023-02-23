import { createSlice } from "@reduxjs/toolkit";
import { IPaymentMethod } from "../../types";



const initialState: {
    paymentMethods: IPaymentMethod<any>[]
} = {
    paymentMethods: []
}



const paymentMethodsSlice = createSlice({
    name: "paymentMethodsSlice",
    initialState: initialState,
    reducers: {
        setPaymentMethods: (state, action) => {
            state.paymentMethods = action.payload.paymentMethods
        }
    }
})


export default paymentMethodsSlice.reducer;


// actions
export const {setPaymentMethods} = paymentMethodsSlice.actions


// selectors
export const selectedPaymentMethod = (state: any) => state.paymentMethods







