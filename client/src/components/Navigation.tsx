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
  return (
    <header className="bg-[var(--ff-green)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold">
            FunFinder732
          </NavLink>

          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
