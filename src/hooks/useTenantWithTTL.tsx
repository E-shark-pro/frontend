// src/hooks/useTenantWithTTL.ts
import { useEffect, useState } from "react";
import { useGetTenantQuery } from "@/services/api/tenant";
import { setWithTTL, getWithTTL } from "@/lib/expiryLocalStorage";
import type { Tenant } from "@/types/tenant.type";
import { Tenant_EXPIRE_DATA_TIME } from "@/settings";

const TENANT_KEY = "tenant:data";

export function useTenantWithTTL() {
    const [tenant, setTenant] = useState<Tenant | null>(() => getWithTTL<Tenant>(TENANT_KEY));

    // If cached tenant exists and not expired, skip fetch
    const skip = Boolean(tenant);
    const { data, isSuccess } = useGetTenantQuery(undefined, { skip });

    useEffect(() => {
        if (isSuccess && data) {
            setTenant(data);
            setWithTTL<Tenant>(TENANT_KEY, data, Tenant_EXPIRE_DATA_TIME);
        }
    }, [isSuccess, data]);

    return tenant;
}
