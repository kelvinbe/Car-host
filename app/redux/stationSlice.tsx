import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { IStation } from "../globaltypes";

const stations:IStation[] = []
const stationSlice = createSlice({
    name: 'stations',
    initialState: {
        stations: stations,
    },
    reducers: {
        getStations(state, action){
            state.stations= action.payload;
        }
    }
})

export const selectStations = (state: RootState)=>state.stations.stations
export const { getStations } = stationSlice.actions;
export default stationSlice.reducer;