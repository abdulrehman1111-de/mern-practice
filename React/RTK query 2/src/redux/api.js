import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "myApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["Posts"],
    endpoints: (builder)=>({
        getPosts: builder.query({query: ()=> "/posts", providesTags: ["Posts"]}),
        newPosts: builder.mutation({
            query: (data)=> ({
                url: "posts",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Posts"]
        }),
        deletePosts: builder.mutation({
            query: (id)=>({
                url: `/posts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Posts"]
        }),
        updatePosts: builder.mutation({
            query: ({id, ...data})=>({
                url: `posts/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Posts"]
        })
    })
})

export const {useGetPostsQuery, useNewPostsMutation, useDeletePostsMutation, useUpdatePostsMutation} = myApi










