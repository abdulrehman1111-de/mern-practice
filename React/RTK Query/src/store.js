import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Fakestoreapi } from './Fakestore'

export const store = configureStore({
  reducer: {
    [Fakestoreapi.reducerPath]: Fakestoreapi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Fakestoreapi.middleware),
})

setupListeners(store.dispatch)