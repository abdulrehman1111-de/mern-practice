import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './services'
import { postsUrl } from './services'
import { commentsUrl } from './services'
import { todosUrl } from './services'
import { usersUrl } from './services'

export const JsonPlaceholderApi = createApi({
  reducerPath: 'JsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `${usersUrl}`,
    }),
    getUsersById: builder.query({
      query: (id) => `${usersUrl}?id=${id}`,
    }),
    getPostsByUserId: builder.query({
      query: (id) => `${postsUrl}?userId=${id}`,
    }),
    getCommentsByPostId: builder.query({
      query: (id) => `${commentsUrl}?postId=${id}`,
    }),
    getTodosByUserId: builder.query({
      query: (id) => `${todosUrl}?userId=${id}`,
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