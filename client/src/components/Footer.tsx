import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-[var(--ff-cream)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link to="/" className="text-lg font-bold text-[var(--ff-green)]">
              FunFinder732
            </Link>
            <p className="text-sm text-[var(--ff-gray)] mt-1">
              Family activities in Monmouth County, NJ
            </p>
            <p className="text-sm text-[var(--ff-gray)]">
              FunFinder is a project by Navesink Humans
            </p>
          </div>

          <nav className="flex gap-6 text-sm">
            <Link to="/" className="text-[var(--ff-gray)] hover:text-[var(--ff-green)]">
              Home
            </Link>
            <Link to="/family-fitness" className="text-[var(--ff-gray)] hover:text-[var(--ff-green)]">
              Family Fitness
            </Link>
            <Link to="/about" className="text-[var(--ff-gray)] hover:text-[var(--ff-green)]">
              About
            </Link>
            <Link to="/submit" className="text-[var(--ff-gray)] hover:text-[var(--ff-green)]">
              Submit Event
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-[#e0dbd0] text-center text-xs text-[var(--ff-gray)]">
          © {new Date().getFullYear()} FunFinder732. Made for Monmouth County families by a Monmouth County family.
        </div>
      </div>
    </footer>
  );
}
