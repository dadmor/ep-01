import { jsx as _jsx } from "react/jsx-runtime";
import { colorPalette } from '../colors';
export function Card({ children, className = '', hover = false, variant = 'default' }) {
    const style = colorPalette[variant];
    return (_jsx("div", { className: `
        card rounded-xl border shadow-sm
        ${style.bg}
        ${style.border}
        ${hover ? 'hover:shadow-md hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-0.5' : ''}
        ${className}
      `, children: children }));
}
