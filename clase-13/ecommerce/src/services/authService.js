import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiKey, baseURL } from "../databases/users";


export const authApi = createApi({
    reducerPath: "authApi", //establece un nombre unico para la Api
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signUp?key=${apiKey}`,
                method: "POST",
                body: auth,
            }),
        }),
        signIn: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signInWithPassword?key=${apiKey}`,
                method: "POST",
                body: auth,
            }),
        }), 
        logOut: builder.mutation({
            query: ({...auth}) => ({
                url: `/accounts:signOut?key=${apiKey}`,
                method: "POST",
                body: auth,
            }),
        }),
    }), 
})

export const { useSignUpMutation, useSignInMutation, logOut } = authApi; // exporta las mutaciones para ser usadas en los componentes