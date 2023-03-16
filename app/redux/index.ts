import locationsSlice, { locationsApi } from './locationsSlice';
import { combineReducers } from "redux";
import reservationSlice from './reservationSlice';
import eventSlice from './eventSlice';
import resourceSlice from './resourceSlice';
import vehiclesSlice from './vehiclesSlice';
import payoutSlice from './payoutSlice';
import stationSlice from './stationSlice';

export const reducers = combineReducers({
    [locationsApi.reducerPath]: locationsApi.reducer,
    locations:locationsSlice,
    reservations: reservationSlice,
    events: eventSlice,
    resources: resourceSlice,
    vehicles:vehiclesSlice,
    payout:payoutSlice,
    stations:stationSlice
})

export type RootState = ReturnType<typeof reducers>