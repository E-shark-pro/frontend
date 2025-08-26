// Need to use the React-specific entry point to import createApi

import { LoginRequest, LoginResponse } from '../../types/login.type'
import { api } from '@/services/api/api'


// Define a service using a base URL and expected endpoints
export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: {
                        ...data
                    }
                }
            },
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi