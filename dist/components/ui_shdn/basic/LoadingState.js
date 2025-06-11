import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { LoadingSpinner } from '../basic/LoadingSpinner';
export const LoadingState = ({ loading = true, children = null }) => {
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-[20rem]", children: _jsx(LoadingSpinner, {}) }));
    }
    return _jsx(_Fragment, { children: children });
};
