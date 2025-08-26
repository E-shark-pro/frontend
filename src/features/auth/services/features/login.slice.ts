import cookieService from '@/services/cookies/cookieService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/login.type';

type AuthState = {
    user: LoginResponse["user"];
    token: string | null;
    roles: string[];
    permissions: string[];
};

const initialState: AuthState = {
    user: cookieService.get('user') ? JSON.parse(cookieService.get('user')) : null,
    token: cookieService.get('token') || null,
    roles: cookieService.get('roles') ? JSON.parse(cookieService.get('roles')) : [],
    permissions: cookieService.get('permissions') ? JSON.parse(cookieService.get('permissions')) : [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            const { user, token } = action.payload;

            const roles = user?.roles || [];
            const permissions = user?.permissions || [];

            // store in cookies (persistent across refresh)
            cookieService.set('user', JSON.stringify(user), { path: "/" });
            cookieService.set('token', token, { path: "/" });
            cookieService.set('roles', JSON.stringify(roles), { path: "/" });
            cookieService.set('permissions', JSON.stringify(permissions), { path: "/" });

            // update redux state
            state.user = user;
            state.token = token;
            state.roles = roles;
            state.permissions = permissions;
        },
        logout: (state) => {
            cookieService.remove('user');
            cookieService.remove('token');
            cookieService.remove('roles');
            cookieService.remove('permissions');

            state.user = null;
            state.token = null;
            state.roles = [];
            state.permissions = [];
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
