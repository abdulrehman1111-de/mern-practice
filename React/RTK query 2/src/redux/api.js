import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "myApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["Items"],
    endpoints: (builder)=>({
        getItems: builder.query({query: (resource)=> "/" + resource, providesTags: ["Items"]}),
        newItems: builder.mutation({
            query: ({resource, data})=> ({
                url: resource,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Items"]
        }),
        deleteItems: builder.mutation({
            query: ({resource, id})=>({
                url: `/${resource}/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Items"]
        }),
        updateItems: builder.mutation({
            query: ({resource, id, ...data})=>({
                url: `${resource}/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Items"]
        })
    })
})

export const {useGetItemsQuery, useNewItemsMutation, useDeleteItemsMutation, useUpdateItemsMutation} = myApi










