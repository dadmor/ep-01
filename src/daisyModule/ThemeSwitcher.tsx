// 2. src/components/ThemeSwitcher.tsx

import { useTheme } from "./useTheme";


export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  
  return (
    <button 
      onClick={toggle}
      className="btn btn-ghost btn-sm"
      aria-label="Przełącz motyw"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}