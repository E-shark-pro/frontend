
export interface Theme {
    radius: string
    light: Record<string, string>
    dark: Record<string, string>
}

export interface Plan {
    tier: "free" | "pro" | "enterprise"
    status: "active" | "trialing" | "cancelled"
    renewalDate: string
    seats: number
}

export interface Tenant {
    id: string | null
    name: string
    slug: string
    logoUrl: string
    domain: string
    plan: Plan | null
    owner: {
        id: string
        name: string
        email: string
    } | null
    settings: {
        timezone: string
        language: string
        theme: Theme
    } | null
}