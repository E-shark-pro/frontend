import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookieService from "@/services/cookies/cookieService";

export const api = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
        prepareHeaders: (headers) => {
            // if (!headers.has('Content-Type')) {
            //     headers.set('Content-Type', 'application/json');
            // }

            headers.set("Accept", "application/json");
            const token = cookieService.get("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            // console.log([...headers.entries()], "hhhhhhhhh");
            return headers;
        },
    }),

    tagTypes: ["Login", "Workshop", "User", "Tenants"],

    endpoints: () => ({}), // start empty
});
