import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkMode: false, // Default theme is light mode
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setDarkMode: (state, action) => {
            state.isDarkMode = action.payload;
        },
    },
});

export const { toggleTheme, setDarkMode } = themeSlice.actions;
export default themeSlice.reducer;