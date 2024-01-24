import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { baseApiSlice } from './features/baseApiSlice';
import authReducer from '../../auth/src/features/authSlice';

export const store = configureStore({
    reducer: {
        [baseApiSlice.reducerPath]: baseApiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
