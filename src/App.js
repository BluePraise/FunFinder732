import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SubmitEvent from "@/pages/SubmitEvent";
import FamilyFitness from "@/pages/FamilyFitness";
import Pools from "@/pages/Pools";
import ParkEvents from "@/pages/ParkEvents";
function App() {
    return (_jsxs(BrowserRouter, { children: [_jsxs("div", { className: "min-h-screen flex flex-col bg-[var(--ff-cream)]", children: [_jsx(Navigation, {}), _jsx("main", { className: "flex-1 p-6", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/submit", element: _jsx(SubmitEvent, {}) }), _jsx(Route, { path: "/family-fitness", element: _jsx(FamilyFitness, {}) }), _jsx(Route, { path: "/pools", element: _jsx(Pools, {}) }), _jsx(Route, { path: "/park-events", element: _jsx(ParkEvents, {}) })] }) }), _jsx(Footer, {})] }), _jsx(Analytics, {})] }));
}
export default App;
