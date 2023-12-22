import React, { useState, useContext, useEffect, useRef } from 'react'
import { darkTheme, lightTheme } from './styles'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider(props) {
    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')))

    function toggleTheme() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        const saveTheme = () => localStorage.setItem('darkMode', darkMode)
        window.addEventListener('beforeunload', saveTheme);
        return () => window.removeEventListener('beforeunload', saveTheme)
    }, [darkMode])

    const theme = darkMode ? darkTheme : lightTheme

    return (
        <ThemeContext.Provider value={[theme, toggleTheme]}>
            {props.children}
        </ThemeContext.Provider>
    );
}
