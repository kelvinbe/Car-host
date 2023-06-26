import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from 'axios'
import apiClient from "../utils/apiClient";
import { EVENT_DATA_DOMAIN, RESERVATION_DOMAIN } from "../hooks/constants";
import { RootState } from ".";
import { IReservation } from "../globaltypes";
import LogRocket from "logrocket";
import { selectEmulationFeedback } from "./emulationSlice";


interface IResource {
    id: string;
    title: string
}

interface IEvent {
    id: string;
    resourceId: string;
    title: string;
    start: Date;
    end: Date;
    color: string;
    extendedProps: {
        status: string;
    };
    description: string;
}

interface IState {
    resources: Array<Partial<IResource>>
    events: Array<Partial<IEvent>>
    loading: boolean
    error: string | null,
    calendarUpdate: boolean
    calendarError: string | null
    date: Partial<{
        start_time: string,
        end_time: string
    }> | null
}

const initialState: IState = {
    resources: [],
    events: [],
    loading: false,
    error: null,
    calendarUpdate: false,
    calendarError: null,
    date: null
}


export const fetchCalendarData = createAsyncThunk('calendar/fetchCalendarData', async (args: Partial<{
    start_time: string,
    end_time: string,
    reset: boolean
}>|undefined | null = null, {rejectWithValue, getState, dispatch}) => {
    const date = selectDate(getState() as RootState)
    const emulationFeedback = selectEmulationFeedback(getState() as RootState)
    const new_date = args?.reset ? null : {
        start_time: args?.start_time ?? date?.start_time,
        end_time: args?.end_time ?? date?.end_time
    }

    dispatch(updateDate(new_date))

    try {
        const data = (await apiClient.get(EVENT_DATA_DOMAIN, {
            params: {
                user_id: emulationFeedback.data?.id ?? undefined,
                ...new_date
            }
        })).data

        return data as {
            resources: Array<Partial<IResource>>
            events: Array<Partial<IEvent>>
        }
    } 
    catch (e)
    {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})


export const blockCalendarSlot = createAsyncThunk('calendar/blockCalendarSlot', async (args: Partial<IReservation>, {rejectWithValue, dispatch}) => {
    try {
        await apiClient.post(`${RESERVATION_DOMAIN}/slot`, args)
        dispatch(fetchCalendarData())
        return null
    } catch (e) 
    {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})

export const unblockCalendarSlot = createAsyncThunk('calendar/unblockCalendarSlot', async (args: {
    reservation_id: string
}, {rejectWithValue, dispatch}) => {
    try {
        await apiClient.delete(`${RESERVATION_DOMAIN}/slot`, {data: args})
        dispatch(fetchCalendarData())
        return null
    }
    catch (e)
    {
        LogRocket.error(e)
        return rejectWithValue((e as AxiosError)?.message)
    }
})




const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        updateDate: (state, action) => {
            state.date = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalendarData.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCalendarData.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.resources = action.payload.resources
            state.events = action.payload.events
        })
        builder.addCase(fetchCalendarData.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
        builder.addCase(blockCalendarSlot.pending, (state)=>{
            state.calendarUpdate = true
            state.calendarError = null
        })
        builder.addCase(blockCalendarSlot.fulfilled, (state)=>{
            state.calendarUpdate = false
            state.calendarError = null
        })
        builder.addCase(blockCalendarSlot.rejected, (state, action)=>{
            state.calendarUpdate = false
            state.calendarError = action.payload as string
        })
        builder.addCase(unblockCalendarSlot.pending, (state)=>{
            state.calendarUpdate = true
            state.calendarError = null
        })
        builder.addCase(unblockCalendarSlot.fulfilled, (state)=>{
            state.calendarUpdate = false
            state.calendarError = null
        })
        builder.addCase(unblockCalendarSlot.rejected, (state, action)=>{
            state.calendarUpdate = false
            state.calendarError = action.payload as string
        })
    }
})

export const { updateDate } = calendarSlice.actions

export default calendarSlice.reducer

export const selectCalendarFeedback = (state: RootState) => {

    const calendar = state.calendar 

    return {
        data: {
            resources: calendar?.resources,
            events: calendar?.events
        },
        error: calendar?.error,
        loading: calendar?.loading,
        calendarUpdate: calendar?.calendarUpdate,
        calendarError: calendar?.calendarError
    }

}

const selectDate = (state: RootState) => state.calendar.date