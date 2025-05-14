import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            token: null,
            localId: null,
            imageCamera: null,
        }
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.value.user = payload.email
            state.value.token = payload.idToken
            state.value.localId = payload.localId
        },
        clearUser: (state) => {
            state.value.user = null
            state.value.token = null
        },
        setImageCamera: (state, {payload}) => {
            state.value.imageCamera = payload
        },
        clearImageCamera: (state) => {
            state.value.imageCamera = null
        },
    }
})

export const { setUser, clearUser, setImageCamera, clearImageCamera } = authSlice.actions
export default authSlice.reducer