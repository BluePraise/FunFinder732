import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[var(--ff-green)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link to="/" className="text-lg font-bold text-white">
              FunFinder732
            </Link>
            <p className="text-sm text-white/80 mt-1">
              Family activities in Monmouth County, NJ
            </p>
            <p className="text-sm text-white/80">
              FunFinder is a project by Navesink Humans
            </p>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="text-white/80 hover:text-white">
              Home
            </Link>
            <Link to="/family-fitness" className="text-white/80 hover:text-white">
              Family Fitness
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white">
              About
            </Link>
            <Link to="/submit" className="text-white/80 hover:text-white">
              Submit Event
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-white/20 text-center text-xs text-white/70">
          © {new Date().getFullYear()} FunFinder732. Made for Monmouth County families by a Monmouth County family.
        </div>
      </div>
    </footer>
  );
}
