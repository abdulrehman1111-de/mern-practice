import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { JsonPlaceholderApi } from './JsonPlaceholderApi'

export const store = configureStore({
  reducer: {
    [JsonPlaceholderApi.reducerPath]: JsonPlaceholderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(JsonPlaceholderApi.middleware),
})

setupListeners(store.dispatch)