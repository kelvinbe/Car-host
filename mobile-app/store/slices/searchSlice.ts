import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Location from 'expo-location'
import { RootState } from ".";

export const searchLocally = createAsyncThunk('search/searchLocally', async (data,{rejectWithValue})=>{
    try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            rejectWithValue('Permission to access location was denied')
        }
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        })

        return location.coords
    } catch (e) {
        rejectWithValue(e)
    }   
})


interface ReducerState {
    coords: Location.LocationObjectCoords | null
    loadingCoords: boolean
    errorCoords: string | null
}

const initialState: ReducerState = {
    coords: null,
    loadingCoords: false,
    errorCoords: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(searchLocally.pending, (state, action) => {
            state.loadingCoords = true
            state.errorCoords = null
        })
        builder.addCase(searchLocally.fulfilled, (state, action) => {
            state.coords = action.payload ?? null
            state.loadingCoords = false
        })
        builder.addCase(searchLocally.rejected, (state, action) => {
            state.coords = null
            state.loadingCoords = false
            state.errorCoords = action.payload as string
        })
    }
})

export default searchSlice.reducer;


export const selectCoords = (state: RootState) => {
    return {
        data: state.search.coords,
        loading: state.search.loadingCoords,
        error: state.search.errorCoords
    }
}