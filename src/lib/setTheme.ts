// src/lib/setTheme.ts
import type { Tenant } from "@/types/tenant.type";

// Apply tenant theme colors to CSS variables
export function applyTenantTheme(theme: Tenant["settings"]["theme"]) {
    if (!theme) return;

    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        // convert API keys like "primary_foreground" -> "primary-foreground"
        const cssKey = key.replace(/_/g, "-");
        root.style.setProperty(`--color-${cssKey}`, value);
    });
}
