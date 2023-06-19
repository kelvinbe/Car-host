import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import LogRocket from "logrocket";

export interface IAmenities{
    amenities: (string| number)[],
    parkingAvailable: boolean,
    parkingRateType: string,
    parkingReservationNeed: boolean,
    parkingRate: number,
    petsAvailable: boolean,
    petsAccepted: boolean,
    smokingAllowed: boolean,
    parkingType: string,
}

interface InitialState{
    data: IAmenities[],
    propertyAmenities: IAmenities
    loading: boolean,
    error: string | null,
}

const initialState: InitialState = {
    data: [],
    propertyAmenities:{
        amenities: [],
        parkingAvailable: false,
        parkingRateType: '',
        parkingReservationNeed: false,
        parkingRate: 0,
        petsAvailable: false,
        petsAccepted: false,
        smokingAllowed: true,
        parkingType: '',
    },
    loading: false,
    error: '',
}

export const createPropertyAmenities = createAsyncThunk("propertyAmenities/createPropertyAmenities",async (data:IAmenities, {dispatch, rejectWithValue}) => {
    try{
        /**
         * @todo add implementation to store data to a database and also change return value to data from database
         */
        return data
    }catch(error){
        rejectWithValue(error)
        LogRocket.error(error)
    }
})
const propertyAmenitiesSlice = createSlice({
    name: 'propertyAmenities',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(createPropertyAmenities.pending, (state)=>{
          state.loading = true
        })

        builder.addCase(createPropertyAmenities.fulfilled, (state, action)=>{
          state.loading = false 
          state.propertyAmenities = {...state.propertyAmenities, ...action.payload}
        })
        builder.addCase(createPropertyAmenities.rejected, (state, action)=>{
          state.loading=false
          state.error = action.payload as string
        })
    }
})

export default propertyAmenitiesSlice.reducer;
export const selectAmenities = (state: RootState)=>state.propertyAmenities.propertyAmenities