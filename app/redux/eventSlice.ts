import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import EventInput from "@fullcalendar/react";
  
const events: EventInput[] = []

const eventSlice = createSlice({
    name: "events",
    initialState: {events:events},
    reducers: {
        getEvents(state, action){
            state.events = action.payload
        }
    }
})
export const selectedEvents = (state: RootState)=>state.events.events
export const {getEvents} = eventSlice.actions
export default eventSlice.reducer