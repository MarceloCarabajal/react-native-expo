import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode, toggleTheme } from '../features/Theme/themeSlice';
import { getTheme } from '../global/theme';

export const useTheme = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const dispatch = useDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme())
    };

    const applyTheme = (value) => {
        dispatch(setDarkMode(value))
    };

    const theme = getTheme(isDarkMode);

    return { isDarkMode, theme, toggleTheme: handleToggleTheme, applyTheme}
};
