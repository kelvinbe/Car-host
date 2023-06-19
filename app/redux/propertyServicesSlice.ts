import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LogRocket from "logrocket";
import { RootState } from "."; 

export interface IPServices{
    mealsAvailable: boolean,
    mealsIncludedInPricePaid: boolean,
    mealsOffered: string[],
    languages: (string | number)[],
}

interface InitialState{
    data: IPServices[],
    propertyServices: IPServices,
    loading: boolean,
    error: string | null,
}

const initialState: InitialState={
    data: [],
    propertyServices: {
        mealsAvailable: false,
        mealsIncludedInPricePaid: false,
        mealsOffered: [],
        languages: [],
    },
    loading: false,
    error: '',
}

export const createPropertyServices = createAsyncThunk('propertyServices',async (data: IPServices, {dispatch, rejectWithValue}) => {
    try{
        /**
         * @todo add implementation to store data to a database and also change return value to data from database
         */
        return data
    }catch(error){
        LogRocket.error(error)
    }
})

const propertyServicesSlice = createSlice({
    name: 'propertyServices',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(createPropertyServices.pending, (state)=>{
            state.loading=true
        })
        builder.addCase(createPropertyServices.fulfilled, (state, action)=>{
            state.loading=false
            state.propertyServices = {...state.propertyServices ,...action.payload}
        })
        builder.addCase(createPropertyServices.rejected, (state, action)=>{
            state.loading=false
            state.error = action.payload as string
        })
    }
})

export default propertyServicesSlice.reducer

export const selectPropertyServices=(state: RootState)=>{
    return state.propertyServices.propertyServices
}