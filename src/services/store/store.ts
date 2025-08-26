import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '@/services/api/api';
import tenantReducer from '@/services/store/features/tenant.slice';
// feature slices
import authReducer from '@/features/auth/services/features/login.slice';

// add more slices as needed...

const RootReducer = combineReducers({
    // auth: authReducer,
    tenant: tenantReducer,
    [api.reducerPath]: api.reducer, // RTK Query
});

export const store = configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production', // enable Redux DevTools in dev
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
