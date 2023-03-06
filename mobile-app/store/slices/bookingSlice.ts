import { IPaymentMethod, IReservation } from './../../types';
import { RootState } from './index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVehicle } from "../../types";
import { vehiclesApi } from './vehiclesSlice';
import { reservationsApi } from './reservationSlice';
import dayjs from 'dayjs';


/**
 * @name loadBookingDetailsFromReservation
 * @description, when the user presses on a reservation in the ManageRes screen or History Screen, we need to load the booking details from the reservation,
 *               so that the user can see the booking details and make changes to the booking if they want to
 */
export const loadBookingDetailsFromReservation = createAsyncThunk<any, any>(
    "booking/loadBookingDetailsFromReservation",
    async (reservationId: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;
        //fetch reservation 
        return thunkAPI.dispatch(reservationsApi.endpoints.getReservation.initiate(reservationId as any)).unwrap().then((reservation)=>{
            // console.log(reservation)
            const { end_date_time, start_date_time, total_cost, vehicle, payment_method_details, status } = reservation
            // now all we need to fetch is the vehicle info
            return thunkAPI.dispatch(vehiclesApi.endpoints.getVehicle.initiate(vehicle.vehicle_id)).unwrap().then((vehicle)=>{
                // now we can return the vehicle info payment method and the rest of the info related to the reservation
                return {
                    vehicle, 
                    paymentMethod: payment_method_details,
                    endDateTime: end_date_time,
                    total: total_cost,
                    startDateTime: start_date_time,
                    status,
                    locationAddress: ""
                }
            }).catch((e)=>{
                return thunkAPI.rejectWithValue(e)
            })
        }).catch((e)=>{
            return thunkAPI.rejectWithValue("Unable to fetch reservation")
        })
    }
)

const initialState: {
    status: 'Ready' | 'Complete' | 'Incomplete',
    /**
     * The authcode provided to the user by the host, is a requirement for booking
     */
    authCode: string | null,
    rate: string | null,
    tax: string | null,
    total: string | null,
    vehicle: IVehicle | null,
    /**
     * a utc date string representing pickup time, something like 2021-01-01T00:00:00.000Z
     */
    startDateTime: string,
    /**
     * a utc date string representing dropoff time, something like 2021-01-01T00:00:00.000Z
     */
    endDateTime: string,
    duration: number,
    locationId: number | null,
    hostId: number | null,
    /**
     * Billing info is the payment method selected by the user is a requirement for booking
     */
    billingInfo: IPaymentMethod<any> | null,
    /**
     * 0 = cannot book
     * 1 = one of the checks either authCode or billingInfo is missing
     * 2 = both checks are present so the booking can be made
     */
    canBookChecks: number
} = {
    status: 'Incomplete',
    authCode: null,
    rate: null,
    tax: null,
    total: null,
    vehicle: null,
    startDateTime: "",
    endDateTime: "",
    duration: 1,
    locationId: null,
    hostId: null,
    billingInfo: null,
    canBookChecks: 0
}

const bookingSlice = createSlice({
    name: "bookingSlice",
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload.status
        },
        setAuthCode: (state, action) => {
            state.authCode = action.payload.authCode
            state.canBookChecks = state.authCode ?state.canBookChecks + 1 : state.canBookChecks - 1
        },
        setStartDateTime: (state, action) => {
            state.startDateTime = action.payload.startDateTime
        },
        setEndDateTime: (state, action) => {
            state.endDateTime = action.payload.endDateTime
        },
        setHostId: (state, action) => {
            state.hostId = action.payload.hostId
        },
        setVehicle: (state, action) => {
            state.vehicle = action.payload.vehicle
        },
        setBillingInfo: (state, action) => {
            state.billingInfo = action.payload.billingInfo
            state.canBookChecks = state.billingInfo ?state.canBookChecks + 1 : state.canBookChecks - 1
        },
        clearBookingState: (state)=>{
            state.status = 'Incomplete'
            state.authCode = null
            state.rate = null
            state.tax = null
            state.total = null
            state.vehicle = null
            state.startDateTime = ""
            state.endDateTime = ""
            state.duration = 1
            state.locationId = null
            state.hostId = null
            state.billingInfo = null
            state.canBookChecks = 0
        }
    },
    extraReducers(builder) {
        builder.addCase(loadBookingDetailsFromReservation.fulfilled, (state, action)=>{
            state.billingInfo = action.payload?.paymentMethod as any
            state.endDateTime = action.payload?.endDateTime as any
            state.total = action.payload?.total as any
            state.startDateTime = action.payload?.startDateTime as any
            state.status = action.payload?.status as any
            state.vehicle = action.payload?.vehicle as any
        })
    },
})

export default bookingSlice.reducer;

// actions
export const {
    setStatus,
    setAuthCode,
    setStartDateTime,
    setEndDateTime,
    setHostId,
    setVehicle,
    setBillingInfo,
    clearBookingState
} = bookingSlice.actions;

// selectors
export const selectAuthenticated = (state: any) => state.authenticated;

export const  selectBookingData = (state: RootState) => state.booking;

export const selectStartDateTime = (state: RootState) => state.booking.startDateTime

export const selectEndDateTime = (state: RootState) => state.booking.endDateTime