import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ResourceInput } from "@fullcalendar/resource";

const resources: ResourceInput[] = []

const resourceSlice = createSlice({
    name: "resources",
    initialState: {resources: resources},
    reducers: {
        getResources(state, action){
            state.resources = action.payload
        }
    }
})
export const selectedResources = (state: RootState)=>state.resources.resources
export const {getResources} = resourceSlice.actions
export default resourceSlice.reducer