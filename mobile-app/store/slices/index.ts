import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import billingSlice from './billingSlice';
import bookingSlice from './bookingSlice';
import errorSlice from './errorSlice';
import historySlice from './historySlice';
import issuesSlice from './issuesSlice';
import navigationSlice from './navigationSlice';
import reservationSlice from './reservationSlice';
import notificationsSlice from './notificationsSlice';
import paymentsSlice from './paymentsSlice';
import resultsSlice from './resultsSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  billing: billingSlice,
  booking: bookingSlice,
  error: errorSlice,
  history: historySlice,
  issues: issuesSlice,
  navigation: navigationSlice,
  notifications: notificationsSlice,
  reservation: reservationSlice,
  payments: paymentsSlice,
  results: resultsSlice,
  user: userSlice
});

export default rootReducer;

//types 
export type RootState = ReturnType<typeof rootReducer>;
