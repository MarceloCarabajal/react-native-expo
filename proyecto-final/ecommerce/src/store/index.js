import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/Counter/counterSlice";
import shopReducer from "../features/Shop/shopSlice";
import cartReducer from "../features/Cart/cartSlice";
import authReducer from "../features/User/userSlice";
import themeReducer from "../features/Theme/themeSlice";

import { shopApi } from "../services/shopServices";
import { authApi } from "../services/authService";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
        cart: cartReducer,
        auth: authReducer,
        theme: themeReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware),
})

setupListeners(store.dispatch)

export default store;