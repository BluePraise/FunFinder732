import { Link } from "react-router-dom";
import { Dumbbell, CalendarDays, Send, Waves, Mail } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--ff-green)] mb-4">
          FunFinder732
        </h1>
        <p className="text-xl text-[var(--ff-gray)] mx-auto">
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

      {/* ── Newsletter Signup ── */}
      <section className="mt-12 mb-4">
        <div className="gym-card p-8 max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <div className="gym-icon green">
              <Mail className="h-6 w-6 text-[var(--ff-green)]" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[var(--ff-green)] mb-1">Stay in the loop</h2>
          <p className="text-sm text-[var(--ff-gray)] mb-5">
            Get a monthly update whenever new events or new updates are added to FunFinder732.
          </p>

          {status === "success" ? (
            <div className="rounded-lg bg-[var(--ff-green-pale)] text-[var(--ff-green)] px-5 py-4 font-medium text-sm">
              🎉 You're on the list! I'll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
              />
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
              />
              {status === "error" && (
                <p className="text-xs text-red-600 text-left">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[var(--ff-green)] text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
              <p className="text-[11px] text-[var(--ff-gray)]">
                About once a month · No spam · Unsubscribe any time
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

