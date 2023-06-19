import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from ".";
import LogRocket from "logrocket";

export interface IProperty{
    propertyType: string,
    propertyName: string,
    country: string,
    latitude: number,
    longitude: number,
    city: string;
    state: string;
    zipCode: number;
    isManaged: boolean;
    numberOfRooms: number;
    rateType: string;
    rate: number;
    moveInLeadTime: number;
    description: string;
    pictures: string[];
}

interface InitialState extends Partial<IProperty>{
    loading: boolean;
    error: string | null;
    data: IProperty[];
  }

const initialState: InitialState = {
    loading: false,
    error: '',
    pictures: [],
    data: [],
}
export const createProperty = createAsyncThunk('properties/fetchProperties', async(data: IProperty, {rejectWithValue, dispatch})=>{
    try{
        /**
         * @todo add implementation to store data to a database and also change return value to data from database
         */
        return data
    }catch(e){
        rejectWithValue(e);
        LogRocket.error(e);
    }
})
const propertySlice = createSlice({
    name: 'property',
    initialState: initialState,
    reducers: {
        setPictures: (state, action)=>{
            state.pictures && state.pictures.push(action.payload);
        }
    },
    extraReducers: (builder)=>{
      builder.addCase(createProperty.pending, (state, action)=>{
        state.loading = true
      })
      builder.addCase(createProperty.fulfilled, (state, action)=>{
        state.loading=false;
        state.propertyName = action.payload?.propertyName;
        state.propertyType = action.payload?.propertyType;
        state.country = action.payload?.country;
        state.latitude = action.payload?.latitude;
        state.longitude = action.payload?.longitude;
        state.city = action.payload?.city;
        state.state = action.payload?.state;
        state.zipCode = action.payload?.zipCode;
        state.isManaged = action.payload?.isManaged;
        state.rateType = action.payload?.rateType;
        state.rate = action.payload?.rate;
        state.numberOfRooms = action.payload?.numberOfRooms;
        state.moveInLeadTime = action.payload?.moveInLeadTime;
        state.description = action.payload?.description;
        state.pictures = action.payload?.pictures;
      })
      builder.addCase(createProperty.rejected, (state, action)=>{
        state.loading=false
        state.error = action.payload as string
      })
    }
})

export default propertySlice.reducer

export const {
    setPictures
} = propertySlice.actions;

export const selectPictures = (state: RootState)=>state.property.pictures


export const selectProperty = (state: RootState)=>{
    return {
        propertyType: state.property.propertyType,
        propertyName: state.property.propertyName,
        country: state.property.country,
        city: state.property.city,
        latitude: state.property.latitude,
        longitude: state.property.longitude,
        state: state.property.state,
        zipCode: state.property.zipCode,
        isManaged: state.property.isManaged,
        rateType: state.property.rateType,
        rate: state.property.rate,
        numberOfRooms: state.property.numberOfRooms,
        moveInLeadTime: state.property.moveInLeadTime,
        description: state.property.description,
        pictures: state.property.pictures,
    }
}
