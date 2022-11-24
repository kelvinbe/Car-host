import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import navigationSlice from './navigationSlice';

const rootReducer = combineReducers({
  counter: counterSlice,
  navigation: navigationSlice
});

export default rootReducer;

//types 
export type RootState = ReturnType<typeof rootReducer>;
