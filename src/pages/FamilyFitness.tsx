export default function FamilyFitness() {
  return (
		<div className="max-w-[900px] mx-auto">
			{/* Page Intro */}
			<div className="page-intro">
				<h2>Work Out, Kids Play</h2>
				<p>
					All gyms below offer supervised childcare so parents can
					work out worry-free. Drop-off is typically up to 2 hours per
					visit and requires an active membership.
					<strong>☝️ Important:</strong>
					You must be an active member to use the childcare services
					and you must be present on the premises while your child is
					in the care of the gym staff.
				</p>
			</div>

			<div className="flex flex-col gap-6">
				{/* Life Time Fitness */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon gold">🏋️</div>
						<div className="gym-name">
							<h3>Life Time Fitness</h3>
							<p className="subtitle">
								Kids Academy · Middletown, NJ
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">All ages welcome</span>
							<p className="membership-note">
								Membership required
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">Kids Academy Hours</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Weekends</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:00 AM – 2:00 PM
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Mon – Thurs</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:30 AM – 1:00 PM
									</span>
									<span className="time-pill evening">
										4:00 PM – 8:00 PM
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Friday</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:30 AM – 1:00 PM
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">📍 Middletown, NJ</span>
						<a
							href="https://lifetime.life"
							className="phone"
							target="_blank"
							rel="noopener noreferrer">
							lifetime.life
						</a>
					</div>
				</article>

				{/* Atlantic Club */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon green">🌿</div>
						<div className="gym-name">
							<h3>The Atlantic Club</h3>
							<p className="subtitle">
								KidZone · Red Bank, NJ (Genesis Health Clubs)
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">
								6 months – 9 years
							</span>
							<p className="membership-note">
								Membership required
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">KidZone Hours</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Weekdays</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:00 AM – 1:00 PM
									</span>
									<span className="time-pill evening">
										4:00 PM – 7:30 PM
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Weekends</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:00 AM – 1:00 PM
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">📍 Red Bank, NJ</span>
						<a
							href="https://theatlantic.club"
							className="phone"
							target="_blank"
							rel="noopener noreferrer">
							theatlantic.club
						</a>
					</div>
				</article>

				{/* Red Bank YMCA */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon blue">🏊</div>
						<div className="gym-name">
							<h3>Red Bank Family YMCA</h3>
							<p className="subtitle">
								Kids Club · 166 Maple Ave, Red Bank
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">
								3 months – 8 years
							</span>
							<p className="membership-note">
								Family membership required
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">Kids Club Hours</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Mon – Sun</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										8:00 – 11:30 AM
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Mon – Thurs</dt>
								<dd className="time-slots">
									<span className="time-pill evening">
										3:30 – 7:30 PM
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">
							📍 166 Maple Ave, Red Bank, NJ 07701
						</span>
						<a href="tel:7327412504" className="phone">
							732-741-2504
						</a>
					</div>
				</article>

				{/* Availability Comparison */}
				<section className="gym-card p-5">
					<h3 className="section-header">
						At a Glance — Childcare Availability
					</h3>
					<table className="compare-table">
						<caption>
							AM = morning session · PM = afternoon/evening
							session
						</caption>
						<thead>
							<tr>
								<th>Day</th>
								<th>Life Time</th>
								<th>Atlantic Club</th>
								<th>Red Bank YMCA</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Monday</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
							</tr>
							<tr>
								<td>Tuesday</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
							</tr>
							<tr>
								<td>Wednesday</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
							</tr>
							<tr>
								<td>Thursday</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
							</tr>
							<tr>
								<td>Friday</td>
								<td>
									<span className="avail">AM only</span>
								</td>
								<td>
									<span className="avail">AM</span> +{" "}
									<span className="avail-eve">PM</span>
								</td>
								<td>
									<span className="avail">AM only</span>
								</td>
							</tr>
							<tr>
								<td>Saturday</td>
								<td>
									<span className="avail">AM only</span>
								</td>
								<td>
									<span className="avail">AM only</span>
								</td>
								<td>
									<span className="avail">AM only</span>
								</td>
							</tr>
							<tr>
								<td>Sunday</td>
								<td>
									<span className="avail">AM only</span>
								</td>
								<td>
									<span className="avail">AM only</span>
								</td>
								<td>
									<span className="avail">AM only</span>
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				{/* Pricing Comparison */}
				<section className="gym-card p-5">
					<h3 className="section-header">
						Monthly Membership Cost — 2 Adults + 2 Children
					</h3>
					<table className="compare-table">
						<caption>
							Atlantic Club: $207/mo for 2 adults + $35/mo kids
							add-on = $242/mo · YMCA: flat $102/mo covers entire
							family · Life Time: per-person pricing
						</caption>
						<thead>
							<tr>
								<th>Cost Breakdown</th>
								<th>Life Time</th>
								<th>Atlantic Club</th>
								<th>Red Bank YMCA</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Per adult</td>
								<td>$250/mo</td>
								<td>
									<span className="unavail">—</span>
								</td>
								<td>
									<span className="unavail">—</span>
								</td>
							</tr>
							<tr>
								<td>Per child</td>
								<td>$70/mo</td>
								<td>
									<span className="unavail">—</span>
								</td>
								<td>
									<span className="unavail">—</span>
								</td>
							</tr>
							<tr>
								<td>2 adults</td>
								<td>$500/mo</td>
								<td>
									$207/mo{" "}
									<small className="text-[var(--ff-gray)]">
										(6-mo commitment)
									</small>
								</td>
								<td>
									<span className="unavail">—</span>
								</td>
							</tr>
							<tr>
								<td>2 children</td>
								<td>$140/mo</td>
								<td>
									$35/mo{" "}
									<small className="text-[var(--ff-gray)]">
										(fixed add-on)
									</small>
								</td>
								<td>
									<span className="unavail">—</span>
								</td>
							</tr>
							<tr>
								<td>Family bundle</td>
								<td>
									<span className="unavail">—</span>
								</td>
								<td>
									<span className="unavail">—</span>
								</td>
								<td>
									$102/mo{" "}
									<small className="text-[var(--ff-gray)]">
										(all members)
									</small>
								</td>
							</tr>
							<tr className="price-total">
								<td>Total/month</td>
								<td className="price-high">$640/mo</td>
								<td className="price-mid">$242/mo</td>
								<td className="price-low">$102/mo</td>
							</tr>
							<tr>
								<td>Annual cost</td>
								<td className="price-high">~$7,680</td>
								<td className="price-mid">
									~$2,904{" "}
									<small className="text-[var(--ff-gray)]">
										(if renewed)
									</small>
								</td>
								<td className="price-low">~$1,224</td>
							</tr>
						</tbody>
					</table>
				</section>

				{/* Summer Camps Header */}
				<div className="pt-2">
					<h2 className="section-title">
						☀️ Summer Camps & Day Camps
					</h2>
					<p className="text-[0.9rem] text-[var(--ff-gray)] mt-1">
						Week-by-week summer programs separate from daily
						childcare drop-in.
					</p>
				</div>

				{/* Atlantic Club Summer Camp */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon green">🏕️</div>
						<div className="gym-name">
							<h3>The Atlantic Club Summer Camp</h3>
							<p className="subtitle">
								Manasquan, NJ · tacsummercamp.com · Note:
								separate from Red Bank location
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">
								18 months – 17 years
							</span>
							<p className="membership-note">
								No membership required
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">Camp Offerings</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Rookie Camp</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										Ages 2.5 – entering 1st grade
									</span>
									<span className="time-pill">
										Full day 8:30AM–3PM · $425/wk
									</span>
									<span className="time-pill">
										Half day 8:30AM–12PM · $325/wk
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Day Camp</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										Grades 2–6
									</span>
									<span className="time-pill">
										Indoor/outdoor games, arts & crafts,
										swim
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Extended Care</dt>
								<dd className="time-slots">
									<span className="time-pill evening">
										3:15–4:30 PM · $20/day
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Also offers</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Sports camps
									</span>
									<span className="time-pill">
										Tennis camp
									</span>
									<span className="time-pill">
										Circus camp
									</span>
									<span className="time-pill">
										50+ specialty camps
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">
							📍 1904 Atlantic Ave, Manasquan, NJ 08736
						</span>
						<a
							href="https://tacsummercamp.com"
							className="phone"
							target="_blank"
							rel="noopener noreferrer">
							tacsummercamp.com
						</a>
					</div>
				</article>

				{/* Life Time Summer Camp */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon gold">🏋️</div>
						<div className="gym-name">
							<h3>Life Time Kids Summer Camp</h3>
							<p className="subtitle">
								Middletown, NJ · Members only add-on
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">Ages 4–13</span>
							<p className="membership-note">
								Membership required
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">Camp Details</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Hours</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										9:00 AM – 4:00 PM
									</span>
									<span className="time-pill">
										Before care 7–9 AM (free)
									</span>
									<span className="time-pill evening">
										After care 4–6 PM (free)
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Pricing</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Per child, per week · varies by location
									</span>
									<span className="time-pill">
										No multi-child discount
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Includes</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Swim lessons
									</span>
									<span className="time-pill">
										2 electives/week
									</span>
									<span className="time-pill">
										STEAM activities
									</span>
									<span className="time-pill">
										Friday field trips
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">📍 Middletown, NJ</span>
						<a
							href="https://lifetime.life"
							className="phone"
							target="_blank"
							rel="noopener noreferrer">
							lifetime.life
						</a>
					</div>
				</article>

				{/* YMCA Summer Camp */}
				<article className="gym-card">
					<div className="gym-header">
						<div className="gym-icon blue">🏊</div>
						<div className="gym-name">
							<h3>Red Bank Family YMCA Day Camp</h3>
							<p className="subtitle">
								ACA Accredited · 166 Maple Ave, Red Bank
							</p>
						</div>
						<div className="gym-meta">
							<span className="age-range">Ages 4–15</span>
							<p className="membership-note">
								Open to non-members
							</p>
						</div>
					</div>
					<section className="schedule-section">
						<p className="childcare-label">
							2025 Season: June 23 – August 29 · Mon–Fri 9AM–4PM
						</p>
						<dl className="schedule-grid">
							<div className="schedule-row">
								<dt className="day-label">Pre-K Camp</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										Ages 4+
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Day Camp</dt>
								<dd className="time-slots">
									<span className="time-pill morning">
										Ages 4–15
									</span>
									<span className="time-pill">
										Swim, sports, arts & crafts, field trips
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Specialty</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Flag Football
									</span>
									<span className="time-pill">
										Soccer (FC Monmouth)
									</span>
									<span className="time-pill">
										Basketball
									</span>
									<span className="time-pill">NASA STEM</span>
									<span className="time-pill">
										LEGO Brixology
									</span>
									<span className="time-pill">
										Ice Skating
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Extended care</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Before & after care available
									</span>
									<span className="time-pill evening">
										Stay the Day 12–4PM · $130 members /
										$145 non-members
									</span>
								</dd>
							</div>
							<div className="schedule-row">
								<dt className="day-label">Pricing</dt>
								<dd className="time-slots">
									<span className="time-pill">
										Members save 10% · Financial assistance
										available
									</span>
								</dd>
							</div>
						</dl>
					</section>
					<div className="gym-footer">
						<span className="address">
							📍 166 Maple Ave, Red Bank, NJ 07701
						</span>
						<a
							href="https://ymcanj.org/camp/red-bank-family-ymca-day-camp/"
							className="phone"
							target="_blank"
							rel="noopener noreferrer">
							ymcanj.org/camp
						</a>
					</div>
				</article>

				<p className="data-note">
					Hours and prices based on available info — verify directly
					with each gym before visiting
				</p>
			</div>
		</div>
  );
}

