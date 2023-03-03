import { locationsApi } from './locationsSlice';
import { combineReducers } from "redux";
import rervationSlice from './reservationSlice';


export const reducers = combineReducers({
    [locationsApi.reducerPath]: locationsApi.reducer,
    reservations: rervationSlice
})

export type RootState = ReturnType<typeof reducers>