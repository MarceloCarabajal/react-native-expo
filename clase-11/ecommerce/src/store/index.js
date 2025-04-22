import counterReducer from "../features/Counter/counterSlice";
import shopReducer from "../features/Shop/shopSlice";

const { configureStore } = require("@reduxjs/toolkit");

export default configureStore({
    reducer: {
        counter: counterReducer,
        shop: shopReducer,
    },
})