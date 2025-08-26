// const publicRoutes: string[] = [
//     '/login',
//     '/register',
//     '/forgot-password',
// ];

const protectedRoutes: string[] = [
    '/dashboard',
    '/profile',
    '/settings',
];

const authRoutes: string[] = [
    '/login',
    '/register',
];

const TENANT_EXPIRE_DATA_DAYS = 5;
const Tenant_EXPIRE_DATA_TIME = 1000 * 60 * 60 * 24 * TENANT_EXPIRE_DATA_DAYS;
export { protectedRoutes, authRoutes, Tenant_EXPIRE_DATA_TIME };
