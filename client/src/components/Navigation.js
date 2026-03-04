import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { Home, Info, Send, Dumbbell, Waves } from "lucide-react";
const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/family-fitness", label: "Family Fitness", icon: Dumbbell },
    { to: "/pools", label: "Pools", icon: Waves },
    { to: "/about", label: "About", icon: Info },
    { to: "/submit", label: "Submit Event", icon: Send },
];
export default function Navigation() {
    return (_jsx("header", { className: "bg-[var(--ff-green)] text-white shadow-md", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx(NavLink, { to: "/", className: "text-xl font-bold", children: "FunFinder732" }), _jsx("nav", { className: "flex items-center gap-1", children: navItems.map(({ to, label, icon: Icon }) => (_jsxs(NavLink, { to: to, className: ({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                ? "bg-white/20 text-white"
                                : "text-white/80 hover:text-white hover:bg-white/10"}`, children: [_jsx(Icon, { className: "h-4 w-4" }), label] }, to))) })] }) }) }));
}
