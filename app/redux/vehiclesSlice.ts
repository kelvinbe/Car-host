import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IVehicle } from "../globaltypes";

const vehicles:IVehicle[] = []
const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: vehicles,
    },
    reducers: {
        getVehicles(state, action){
            state.vehicles= action.payload;
        }
    }
})

export const selectVehicles = (state: RootState)=>state.vehicles.vehicles
export const { getVehicles } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;