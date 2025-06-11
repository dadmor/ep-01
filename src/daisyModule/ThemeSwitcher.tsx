import { Moon, Sun } from "lucide-react";
import { useTheme } from "./useTheme";

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();
  
  return (
    <button 
      onClick={toggle}
      className="btn btn-ghost btn-sm fixed bottom-4 left-4 z-50"
      aria-label="Przełącz motyw"
    >
      {theme === 'light' ? 
        <Moon size={16} className="text-primary" /> : 
        <Sun size={16} className="text-warning" />
      }
    </button>
  );
}