import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const JsonPlaceholderApi = createApi({
  reducerPath: 'JsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
    }),
    getUsersById: builder.query({
      query: (id) => `users?id=${id}`,
    }),
    getPostsByUserId: builder.query({
      query: (id) => `posts?userId=${id}`,
    }),
    getCommentsByPostId: builder.query({
      query: (id) => `comments?postId=${id}`,
    }),
    getTodosByUserId: builder.query({
      query: (id) => `todos?userId=${id}`,
    }),
  }),
})

export const { 

  useGetUsersQuery,
  useGetUsersByIdQuery,
  useGetPostsByUserIdQuery,
  useGetCommentsByPostIdQuery,
  useGetTodosByUserIdQuery

 } = JsonPlaceholderApi