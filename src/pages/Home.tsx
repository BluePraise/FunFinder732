import { Link } from "react-router-dom";
import { Dumbbell, CalendarDays, Send, Waves } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--ff-green)] mb-4">
          FunFinder732
        </h1>
        <p className="text-xl text-[var(--ff-gray)] max-w-2xl mx-auto">
          Discover family activities, events, and recreation in Monmouth County, NJ
        </p>
      </section>

      {/* Quick Links */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 py-8">
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
          to="/pools"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
        >
          <div className="gym-icon blue mb-4">
            <Waves className="h-6 w-6 text-[#0f3f5a]" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Pools</h2>
          <p className="text-sm text-[var(--ff-gray)]">
            Public pools, YMCAs, private clubs &amp; free spraygrounds
          </p>
        </Link>

        <Link
          to="/park-events"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
        >
          <div className="gym-icon gold mb-4">
            <CalendarDays className="h-6 w-6 text-[var(--ff-accent)]" />
          </div>
          <h2 className="text-lg font-semibold mb-2">Park Events</h2>
          <p className="text-sm text-[var(--ff-gray)]">
            Spring 2026 programs from Monmouth County Park System
          </p>
        </Link>

        <Link
          to="/submit"
          className="gym-card p-6 flex flex-col items-center text-center hover:scale-[1.02] transition-transform"
        >
          <div className="gym-icon green mb-4">
            <Send className="h-6 w-6 text-[var(--ff-green)]" />
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

