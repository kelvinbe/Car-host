import LogRocket from '@logrocket/react-native';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    LogRocket.reduxMiddleware(),
  ]
});

export default store;
