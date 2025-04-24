import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/Counter/counterSlice";
import shopReducer from "../features/Shop/shopSlice";
import { shopApi } from "../services/shopServices";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)

export default store;