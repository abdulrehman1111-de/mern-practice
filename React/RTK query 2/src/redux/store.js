import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myreducer } from "./reducer";
import { myApi } from "./api";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'// defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['myApi']
}

const rootReducer = combineReducers({
    myApi: myApi.reducer,
    myreducer: myreducer.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(myApi.middleware),
})

export const persistor = persistStore(store)
