import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: {
            user: "userIdLoggedIn",
            updatedAt: new Date().toLocaleString(),
            total: 0,
            items: [],
        }
    },
    reducers: {
        addToCart: (state, { payload }) => {
            const productRepeated = state.value.items.find((item) => item.id === payload.id)
            if (productRepeated) {
                // productRepeated.quantity += payload.quantity
                const itemsUpdated = state.value.items.map((item) => {
                    if (item.id === payload.id) {
                        item.quantity += payload.quantity
                        return item
                    }
                    return item
                })
                const total = itemsUpdated.reduce((acc, currentItem) =>
                    (acc += currentItem.price * currentItem.quantity), 0)
                state.value = {
                    ...state.value,
                    items: itemsUpdated,
                    //por short hand property name total: total es lo mismo que total,
                    //por lo que se puede escribir solo total
                    total,
                    updatedAt: new Date().toLocaleString()
                }

            } else {
                // immer se encarga de no mutar el estado original
                state.value.items.push(payload)
                // state.value.items = [...state.value.items, payload]
                const total = state.value.items.reduce((acc, currentItem) => 
                    (acc += currentItem.price * currentItem.quantity), 0)

                state.value = {
                    ...state.value,
                    total,
                    updatedAt: new Date().toLocaleString()
                }
            }
        },
        removeFromCart: (state, {payload}) => {
            const itemsUpdated = state.value.items.filter((item) => item.id !== payload.id)
            const total = itemsUpdated.reduce((acc, currentItem) =>
                (acc += currentItem.price * currentItem.quantity), 0)
            state.value = {
                ...state.value,
                items: itemsUpdated,
                total: total,
                updatedAt: new Date().toLocaleString()
            }
        },
        clearCart: (state) => {
            state.value.items = [];
            state.value.total = 0;
        },
        increaseQuantity: (state, { payload }) => {
            const itemUpdated = state.value.items.map((item) => {
                if (item.id === payload.id) {
                    item.quantity += 1;
                }
                return item;
            })

            const total = itemUpdated.reduce(
                (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
                0
            )

            state.value = {
                ...state.value,
                items: itemUpdated,
                total: total,
                updatedAt: new Date().toLocaleString()
            }
        },

        decreaseQuantity: (state, { payload }) => {
            const itemSUpdated = state.value.items
                .map((item) => {
                    if (item.id === payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity > 1 ? item.quantity - 1 : 1
                        }
                    }
                    return item;
                })

            const total = itemSUpdated.reduce(
                (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
                0
            )

            state.value = {
                ...state.value,
                items: itemSUpdated,
                total: total,
                updatedAt: new Date().toLocaleString()
            }
        }

    },
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;