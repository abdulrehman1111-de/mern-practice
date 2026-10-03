import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from './services'
import { postsUrl } from './services'
// import { commentsUrl } from './services'
// import { todosUrl } from './services'
// import { usersUrl } from './services'

export const JsonPlaceholderApi = createApi({
  reducerPath: 'JsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ url, params }) => {
        let obj
        return obj = {
          url: url,
          params: params
        }
      },
    }),

    deletePost: builder.mutation({
      query, onQueryStarted: async ({ id }) => {
        let obj
        return obj = {
          url: `${postsUrl}/${id}`,
          method: 'DELETE'
        }
      }
    }),

    editPost: builder.mutation({
      query: ({ id, body }) => {
        let obj
        return obj = {
          url: `${postsUrl}/${id}`,
          method: 'PATCH',
          body: body
        }
      }
    }),

    createPost: builder.mutation({
      query: ({body}) => {
        let obj
        return obj = {
          url: postsUrl,
          method: 'POST',
          body: body
        }
      }
    })

  }),
})

export const {
  useGetDataQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useCreatePostMutation
      } = JsonPlaceholderApi