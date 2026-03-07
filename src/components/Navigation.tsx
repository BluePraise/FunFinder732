import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Info, Send, Dumbbell, Waves, CalendarDays, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/family-fitness", label: "Family Fitness", icon: Dumbbell },
  { to: "/pools", label: "Pools", icon: Waves },
  { to: "/park-events", label: "Park Events", icon: CalendarDays },
  { to: "/about", label: "About", icon: Info },
  { to: "/submit", label: "Submit Event", icon: Send },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
  ${isActive ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"}`;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[var(--ff-green)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold">
            FunFinder732
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden border-t border-white/20 px-4 py-3 flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
