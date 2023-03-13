import { locationsApi } from './locationsSlice';
import { combineReducers } from "redux";
import rervationSlice from './reservationSlice';
import vehiclesSlice from './vehiclesSlice';


export const reducers = combineReducers({
    [locationsApi.reducerPath]: locationsApi.reducer,
    reservations: rervationSlice,
    vehicles:vehiclesSlice
})

export type RootState = ReturnType<typeof reducers>