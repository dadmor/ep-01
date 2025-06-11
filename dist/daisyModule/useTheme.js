// 1. src/hooks/useTheme.ts
import { useEffect, useState } from 'react';
export function useTheme() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved || 'light';
    });
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    const toggle = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    return { theme, toggle, setTheme };
}
