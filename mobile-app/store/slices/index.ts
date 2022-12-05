import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import navigationSlice from './navigationSlice';
import reservationSlice from './reservationSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
  navigation: navigationSlice,
  reservation: reservationSlice
});

export default rootReducer;

//types 
export type RootState = ReturnType<typeof rootReducer>;
