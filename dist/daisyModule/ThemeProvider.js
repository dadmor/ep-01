import { jsx as _jsx } from "react/jsx-runtime";
// src/daisyModule/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'light');
    useEffect(() => {
        // Ustaw motyw na <html>
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        // Debug: logi
        console.log('[ThemeProvider] Zastosowano motyw:', theme);
        console.log('[ThemeProvider] <html data-theme=>', document.documentElement.getAttribute('data-theme'));
        // Pobierz i pokaż wartości CSS
        const styles = getComputedStyle(document.documentElement);
        console.log('[ThemeProvider] --p (primary):', styles.getPropertyValue('--p'));
        console.log('[ThemeProvider] --b1 (base-100):', styles.getPropertyValue('--b1'));
    }, [theme]);
    const toggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        console.log('[ThemeProvider] Zmieniam motyw na:', newTheme);
        setThemeState(newTheme);
    };
    const setTheme = (newTheme) => {
        console.log('[ThemeProvider] Ustawiam motyw na:', newTheme);
        setThemeState(newTheme);
    };
    const value = {
        theme,
        toggle,
        setTheme,
    };
    return (_jsx(ThemeContext.Provider, { value: value, children: children }));
}
// Hook do używania kontekstu motywu
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
