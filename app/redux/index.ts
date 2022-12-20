import { locationsApi } from './locationsSlice';
import { combineReducers } from "redux";


export const reducers = combineReducers({
    [locationsApi.reducerPath]: locationsApi.reducer,
})

export type RootState = ReturnType<typeof reducers>