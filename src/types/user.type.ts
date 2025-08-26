// features/auth/types/auth.types.ts

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    roles: string[];
    permissions: string[];
}

