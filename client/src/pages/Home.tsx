import { Link } from "react-router-dom";
import { Dumbbell, Calendar, Send } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section - placeholder for user's visual */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--ff-green)] mb-4">
          FunFinder732
        </h1>
        <p className="text-xl text-[var(--ff-gray)] max-w-2xl mx-auto">
          Discover family activities, events, and recreation in Monmouth County, NJ
        </p>
      </section>

      {/* Quick Links */}
      <section className="grid gap-4 md:grid-cols-3 py-8">
        <Link
          to="/family-fitness"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
        >
          <div className="gym-icon green mb-4">
            <Dumbbell className="h-6 w-6 text-[var(--ff-green)]" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Family Fitness</h2>
          <p className="text-sm text-[var(--ff-gray)]">
            Gyms with childcare, pools, and recreation centers
          </p>
        </Link>

        <Link
          to="/"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform opacity-60"
        >
          <div className="gym-icon blue mb-4">
            <Calendar className="h-6 w-6 text-[#0f3f5a]" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Events</h2>
          <p className="text-sm text-[var(--ff-gray)]">
            Coming soon
          </p>
        </Link>

        <Link
          to="/submit"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
        >
          <div className="gym-icon gold mb-4">
            <Send className="h-6 w-6 text-[var(--ff-accent)]" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Submit Event</h2>
          <p className="text-sm text-[var(--ff-gray)]">
            Share a local activity with the community
          </p>
        </Link>
      </section>
    </div>
  );
}

