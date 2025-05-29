import React from 'react'
import { useSelector } from 'react-redux'

export const useTheme = () => {
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    return { isDarkMode }
}
