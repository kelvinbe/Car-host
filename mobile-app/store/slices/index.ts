import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import navigationSlice from './navigationSlice';
import reservationSlice from './reservationSlice';
import notificationsSlice from "./notificationsSlice"

const rootReducer = combineReducers({
  counter: counterSlice,
  navigation: navigationSlice,
  reservation: reservationSlice,
  notifications: notificationsSlice
});

export default rootReducer;

//types 
export type RootState = ReturnType<typeof rootReducer>;
