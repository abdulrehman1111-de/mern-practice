import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const Fakestoreapi = createApi({
  reducerPath: 'Fakestoreapi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
  }),
})

export const { useGetProductsQuery } = Fakestoreapi;