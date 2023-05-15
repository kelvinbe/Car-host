import locationsSlice, { locationsApi } from './locationsSlice';
import { combineReducers } from "redux";
import reservationSlice from './reservationSlice';
import eventSlice from './eventSlice';
import resourceSlice from './resourceSlice';
import vehiclesSlice from './vehiclesSlice';
import payoutSlice from './payoutSlice';
import stationSlice, { stationsApi } from './stationSlice';
import authcodeSlice from './authcodeSlice';
import requestedAuthCodeSlice from './requestedAuthCodeSlice';
import userSlice from './userSlice';
import onboardingSlice from './onboardingSlice';
import paySlice from './paySlice';

export const reducers = combineReducers({
    [locationsApi.reducerPath]: locationsApi.reducer,
    locations:locationsSlice,
    reservations: reservationSlice,
    events: eventSlice,
    resources: resourceSlice,
    vehicles:vehiclesSlice,
    payout:payoutSlice,
    stations:stationSlice,
    authcode:authcodeSlice,
    requestedAuthCode: requestedAuthCodeSlice,
    users:userSlice,
    [stationsApi.reducerPath]: stationsApi.reducer,
    onBoarding: onboardingSlice,
    pays: paySlice
})

export type RootState = ReturnType<typeof reducers>