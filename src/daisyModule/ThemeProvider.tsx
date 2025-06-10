// src/daisyModule/ThemeProvider.tsx
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggle: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('theme') as 'dark' | 'light') || 'light'
  );

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

  const setTheme = (newTheme: 'dark' | 'light') => {
    console.log('[ThemeProvider] Ustawiam motyw na:', newTheme);
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggle,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook do używania kontekstu motywu
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}