import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../databases/realTimeDataBase";

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['profileImageGet', "locationGet"], //declaro un tag
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "categories.json",
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            // formatear estos datos
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if(responseTransformed.length > 0) return responseTransformed[0]
                return null
            }
        }),
        postOrder: builder.mutation({
            query: (order) => ({
                url: `orders.json`,
                method: 'POST',
                body: order,
            }),
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet'],
        }),
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: 'PUT',
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet'],
        }),
        getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ['locationGet'],
        }),
        postLocation: builder.mutation({
            query: ({location, localId}) => ({
                url: `locations/${localId}.json`,
                method: 'PUT',
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    updateAt: location.updateAt,
                },
            }),
            invalidatesTags: ['locationGet'],
        }),
    })
})

export const { 
    useGetCategoriesQuery, 
    useGetProductsByCategoryQuery, 
    useGetProductByIdQuery, 
    usePostOrderMutation,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetLocationQuery,
    usePostLocationMutation,
} = shopApi