// src/store/features/tenant/tenantSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Tenant } from "@/types/tenant.type";
import { getWithTTL, setWithTTL } from "@/lib/expiryLocalStorage";
import { Tenant_EXPIRE_DATA_TIME } from "@/settings";

const TENANT_KEY = "tenant:data";

const initialState: Tenant | null = getWithTTL<Tenant>(TENANT_KEY);

const tenantSlice = createSlice({
    name: "tenant",
    initialState,
    reducers: {
        setTenant: (_state, action: PayloadAction<Tenant>) => {
            setWithTTL<Tenant>(TENANT_KEY, action.payload, Tenant_EXPIRE_DATA_TIME);
            return action.payload;
        },
        clearTenant: () => {
            localStorage.removeItem(TENANT_KEY);
            return null;
        },
    },
});

export const { setTenant, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
