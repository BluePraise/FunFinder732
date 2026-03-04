import { useState } from "react";

type AccessType = "free" | "day-pass" | "membership";

const ACCESS_LABELS: Record<AccessType, string> = {
  "free":       "Free",
  "day-pass":   "Day Pass OK",
  "membership": "Membership",
};

const ACCESS_COLORS: Record<AccessType, string> = {
  "free":       "bg-[var(--ff-green-pale)] text-[var(--ff-green)] border border-[var(--ff-green-light)]",
  "day-pass":   "bg-[var(--ff-accent-pale)] text-[var(--ff-accent)] border border-[var(--ff-accent)]",
  "membership": "bg-[#f0eaea] text-[var(--ff-red)] border border-[var(--ff-red)]",
};

function AccessBadge({ type }: { type: AccessType }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${ACCESS_COLORS[type]}`}>
      {ACCESS_LABELS[type]}
    </span>
  );
}

export default function Pools() {
  const [filter, setFilter] = useState<"all" | AccessType>("all");

  const show = (...types: AccessType[]) =>
    filter === "all" || types.includes(filter as AccessType);

  const filterButtons: { label: string; value: "all" | AccessType; icon: string }[] = [
    { label: "All",         value: "all",        icon: "🏊" },
    { label: "Free",        value: "free",        icon: "✅" },
    { label: "Day Pass OK", value: "day-pass",    icon: "💵" },
    { label: "Membership",  value: "membership",  icon: "🔒" },
  ];

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Page Intro */}
      <div className="page-intro">
        <h2>Pools &amp; Splash Pads</h2>
        <p>
          Public, municipal, and membership pools across Monmouth County — plus free
          spraygrounds for the little ones. Always verify hours and prices directly
          before visiting.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
        <span className="text-sm font-semibold text-[var(--ff-gray)] self-center mr-1">Show:</span>
        {filterButtons.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all
              ${filter === value
                ? "bg-[var(--ff-green)] text-white border-[var(--ff-green)] shadow"
                : "bg-white text-[var(--ff-gray)] border-gray-300 hover:border-[var(--ff-green)] hover:text-[var(--ff-green)]"
              }`}
          >
            <span>{icon}</span> {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6">

        {/* ── Section: County Park System ── */}
        {show("day-pass") && <div className="pt-2">
          <h2 className="section-title">🏛️ Monmouth County Park System</h2>
          <p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
            Operated by the Monmouth County Park System · Season: late May – September
          </p>
        </div>}

        {/* Fort Monmouth */}
        {show("day-pass") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon blue">🏊</div>
            <div className="gym-name">
              <h3>Fort Monmouth Recreation Center Pool</h3>
              <p className="subtitle">Tinton Falls, NJ · Outdoor, 3,500 sq ft</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="day-pass" />
              <p className="membership-note mt-1">Free for military/veterans</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Season &amp; Access</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Season</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">May 24 – September 1</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Lap Swim</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">Mon–Fri 7–9 AM (Early Bird)</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Discounts</dt>
                <dd className="time-slots">
                  <span className="time-pill">Military/Veterans: FREE</span>
                  <span className="time-pill">RecAssist: 25% off</span>
                  <span className="time-pill">NJ Disabled Pass: fee waived</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Passes</dt>
                <dd className="time-slots">
                  <span className="time-pill">Daily, monthly &amp; season passes available</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 2566 Guam Lane (Corregidor Rd), Tinton Falls, NJ 07724</span>
            <a href="tel:8484564278" className="phone">848-456-4278</a>
          </div>
        </article>}

        {/* Big Brook */}
        {show("day-pass") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon green">🌿</div>
            <div className="gym-name">
              <h3>Big Brook Park Pool</h3>
              <p className="subtitle">Marlboro, NJ · Renovated 2018</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="day-pass" />
              <p className="membership-note mt-1">Call to confirm public swim</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Access Notes</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Primary use</dt>
                <dd className="time-slots">
                  <span className="time-pill">Park System summer camps &amp; community groups</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Public swim</dt>
                <dd className="time-slots">
                  <span className="time-pill evening">Limited sessions — call to confirm</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 Marlboro, NJ (off Henry Hudson Trail)</span>
            <a href="tel:7328424000" className="phone">732-842-4000 ext. 4312</a>
          </div>
        </article>}

        {/* ── Section: Municipal ── */}
        {show("day-pass", "membership") && <div className="pt-2">
          <h2 className="section-title">🏘️ Municipal &amp; Community Pools</h2>
          <p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
            Town-run pools — some pay-per-visit, some require a seasonal badge or membership.
          </p>
        </div>}

        {/* Neptune */}
        {show("day-pass") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon blue">🏊</div>
            <div className="gym-name">
              <h3>Neptune Aquatic Center</h3>
              <p className="subtitle">Neptune City, NJ</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="day-pass" />
              <p className="membership-note mt-1">No membership required</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Access</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Walk-in</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">Day pass available — no membership required</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Extras</dt>
                <dd className="time-slots">
                  <span className="time-pill">Swim lessons offered</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 55 Neptune Blvd, Neptune City, NJ 07753</span>
            <a href="tel:7328335969" className="phone">732-833-5969</a>
          </div>
        </article>}

        {/* Avon */}
        {show("membership") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon green">🌊</div>
            <div className="gym-name">
              <h3>Avon-by-the-Sea Municipal Pool</h3>
              <p className="subtitle">Avon-by-the-Sea, NJ</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="membership" />
              <p className="membership-note mt-1">Guest pass w/ a member</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Access</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Access</dt>
                <dd className="time-slots">
                  <span className="time-pill">Seasonal membership required</span>
                  <span className="time-pill evening">Guest pass available with a member</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Extras</dt>
                <dd className="time-slots">
                  <span className="time-pill">Swim lessons offered</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 Ocean Ave, Avon-by-the-Sea, NJ 07717</span>
            <a href="tel:7325024524" className="phone">732-502-4524</a>
          </div>
        </article>}

        {/* Monmouth Beach */}
        {show("membership") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon blue">🏖️</div>
            <div className="gym-name">
              <h3>Monmouth Beach Bathing Pavilion &amp; Pool</h3>
              <p className="subtitle">Monmouth Beach, NJ · Badge-based access</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="membership" />
              <p className="membership-note mt-1">Season badge required</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">2025 Pricing (approximate — verify directly)</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Resident</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">Adult (12–65): ~$140/season</span>
                  <span className="time-pill morning">Child (5–11): ~$55/season</span>
                  <span className="time-pill morning">Senior (65+): ~$50/season</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Non-resident</dt>
                <dd className="time-slots">
                  <span className="time-pill evening">Adult: ~$380/season</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Day badge</dt>
                <dd className="time-slots">
                  <span className="time-pill">Beach day badge: ~$9</span>
                </dd>
              </div>
              <div className="schedule-row">
                <dt className="day-label">Bathhouse</dt>
                <dd className="time-slots">
                  <span className="time-pill">Full bathhouse + pool (resident): ~$1,100/season (incl. 5 badges)</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 29 Ocean Ave, Monmouth Beach, NJ 07750</span>
            <a href="https://www.monmouthbeachboro.com" className="phone" target="_blank" rel="noopener noreferrer">monmouthbeachboro.com</a>
          </div>
        </article>}

        {/* ── Section: YMCA ── */}
        {show("day-pass") && <div className="pt-2">
          <h2 className="section-title">🏅 YMCA Pools</h2>
          <p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
            Open to members and day-pass visitors.
          </p>
        </div>}

        {/* YMCA Freehold */}
        {show("day-pass") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon blue">🏊</div>
            <div className="gym-name">
              <h3>YMCA Freehold</h3>
              <p className="subtitle">Freehold, NJ</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="day-pass" />
              <p className="membership-note mt-1">Walk-in welcome</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Access</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Walk-in</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">Day pass available</span>
                  <span className="time-pill">Swim lessons offered</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 470 East Freehold Road, Freehold, NJ 07728</span>
            <a href="tel:7324620464" className="phone">732-462-0464</a>
          </div>
        </article>}

        {/* YMCA Red Bank */}
        {show("day-pass") && <article className="gym-card">
          <div className="gym-header">
            <div className="gym-icon blue">🏊</div>
            <div className="gym-name">
              <h3>Red Bank Family YMCA</h3>
              <p className="subtitle">Red Bank, NJ</p>
            </div>
            <div className="gym-meta">
              <AccessBadge type="day-pass" />
              <p className="membership-note mt-1">Walk-in welcome</p>
            </div>
          </div>
          <section className="schedule-section">
            <p className="childcare-label">Access</p>
            <dl className="schedule-grid">
              <div className="schedule-row">
                <dt className="day-label">Walk-in</dt>
                <dd className="time-slots">
                  <span className="time-pill morning">Day pass available</span>
                  <span className="time-pill">Swim lessons offered</span>
                </dd>
              </div>
            </dl>
          </section>
          <div className="gym-footer">
            <span className="address">📍 166 Maple Avenue, Red Bank, NJ 07701</span>
            <a href="tel:7327412504" className="phone">732-741-2504</a>
          </div>
        </article>}

        {/* ── Section: Private ── */}
        {show("day-pass", "membership") && <div className="pt-2">
          <h2 className="section-title">🔒 Private &amp; Membership Pools</h2>
          <p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
            Seasonal memberships — some offer guest passes and swim lessons.
          </p>
        </div>}

        {/* Comparison table */}
        {show("day-pass", "membership") && <section className="gym-card p-5">
          <h3 className="section-header">Private Pool Clubs at a Glance</h3>
          <table className="compare-table">
            <caption>Contact each club directly for current season pricing and availability</caption>
            <thead>
              <tr>
                <th>Club</th>
                <th>Location</th>
                <th>Access</th>
                <th>Features</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {show("day-pass") && <>
                <tr>
                  <td>GoodSports USA</td>
                  <td>Tinton Falls</td>
                  <td><AccessBadge type="day-pass" /></td>
                  <td><span className="avail">Olympic pool, kiddie pool, splash park, lessons</span></td>
                  <td><a href="https://goodsportsusa.com" className="text-[var(--ff-green)] underline underline-offset-2 text-xs" target="_blank" rel="noopener noreferrer">goodsportsusa.com</a></td>
                </tr>
                <tr>
                  <td>Five Star Swim School</td>
                  <td>Eatontown</td>
                  <td><AccessBadge type="day-pass" /></td>
                  <td><span className="avail">Lessons-focused, day pass available</span></td>
                  <td><a href="tel:7323801140" className="text-[var(--ff-green)] underline underline-offset-2 text-xs">732-380-1140</a></td>
                </tr>
                <tr>
                  <td>Boys &amp; Girls Club</td>
                  <td>Asbury Park</td>
                  <td><AccessBadge type="day-pass" /></td>
                  <td><span className="avail-eve">Indoor 25-yard pool · group/team rentals</span></td>
                  <td><a href="https://bgcmonmouth.org" className="text-[var(--ff-green)] underline underline-offset-2 text-xs" target="_blank" rel="noopener noreferrer">bgcmonmouth.org</a></td>
                </tr>
              </>
              }
              {show("membership") && <>
                <tr>
                  <td>Monmouth Heights Swim Club</td>
                  <td>Manalapan</td>
                  <td><AccessBadge type="membership" /></td>
                  <td><span className="avail">Swim lessons, guest passes available</span></td>
                  <td><a href="tel:7323348071" className="text-[var(--ff-green)] underline underline-offset-2 text-xs">732-334-8071</a></td>
                </tr>
                <tr>
                  <td>Howell Pointe Swim Club</td>
                  <td>Freehold</td>
                  <td><AccessBadge type="membership" /></td>
                  <td><span className="unavail">Members only</span></td>
                  <td><a href="tel:7324142172" className="text-[var(--ff-green)] underline underline-offset-2 text-xs">732-414-2172</a></td>
                </tr>
              </>
              }
            </tbody>
          </table>
        </section>}

        {/* ── Section: Spraygrounds ── */}
        {show("free") && <div className="pt-2">
          <h2 className="section-title">💦 Free Spraygrounds</h2>
          <p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
            No swimming required — perfect for toddlers and young kids. Free admission, seasonal parking fees may apply.
          </p>
        </div>}

        {show("free") && <section className="gym-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="section-header mb-0">Monmouth County Park System Spraygrounds</h3>
            <AccessBadge type="free" />
          </div>
          <table className="compare-table">
            <caption>Check monmouthcountyparks.com for current season hours</caption>
            <thead>
              <tr>
                <th>Location</th>
                <th>Town</th>
                <th>Cost</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dorbrook Recreation Area</td>
                <td>Colts Neck</td>
                <td><span className="price-low">Free</span></td>
                <td>Parking fee may apply on summer weekends</td>
              </tr>
              <tr>
                <td>Thompson Park</td>
                <td>Lincroft</td>
                <td><span className="price-low">Free</span></td>
                <td>Check park website for hours</td>
              </tr>
            </tbody>
          </table>
        </section>}

        <p className="data-note">
          Hours and prices based on 2025 info from monmouthcountyparks.com, familyhoodcentral.com, and themonmouthmoms.com — always verify directly before visiting
        </p>
      </div>
    </div>
  );
}
