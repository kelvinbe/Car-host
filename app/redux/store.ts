import { locationsApi } from './locationsSlice';
import { reducers } from './index';
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { stationsApi } from './stationSlice';
import LogRocket from 'logrocket'

const logRocketMiddleware = LogRocket.reduxMiddleware()
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(locationsApi.middleware)
    .concat(stationsApi.middleware)
    .concat(logRocketMiddleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store