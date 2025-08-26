// src/store/services/tenantApi.ts
import { api } from "@/services/api/api";
import type { Tenant } from "@/types/tenant.type";
import { setTenant } from "@/services/store/features/tenant.slice";

export const tenantApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTenant: builder.query<Tenant, void>({
            query: () => "/tenants",
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTenant(data)); // hydrate Redux + localStorage
                } catch {
                    // ignore errors, fallback is localStorage
                }
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetTenantQuery } = tenantApi;
