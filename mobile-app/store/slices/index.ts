import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import bookingSlice from './bookingSlice';
import errorSlice from './errorSlice';
import historySlice, { historyApi } from './historySlice';
import issuesSlice from './issuesSlice';
import navigationSlice from './navigationSlice';
import reservationSlice, { reservationsApi } from './reservationSlice';
import notificationsSlice from './notificationsSlice';
import paymentsSlice from './paymentsSlice';
import resultsSlice from './resultsSlice';
import userSlice from './userSlice';
import { vehiclesApi } from './vehiclesSlice';
import { billingApi } from './billingSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  [billingApi.reducerPath]: billingApi.reducer,
  booking: bookingSlice,
  error: errorSlice,
  history: historySlice,
  [historyApi.reducerPath]: historyApi.reducer, 
  issues: issuesSlice,
  navigation: navigationSlice,
  notifications: notificationsSlice,
  reservation: reservationSlice,
  [reservationsApi.reducerPath]: reservationsApi.reducer,
  payments: paymentsSlice,
  results: resultsSlice,
  user: userSlice,
  [vehiclesApi.reducerPath]: vehiclesApi.reducer
});

export default rootReducer;

//types 
export type RootState = ReturnType<typeof rootReducer>;
