import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle } from "lucide-react";

export default function SubmitEvent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    cost: "",
    contactEmail: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual submission logic
    console.log("Event submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Your event has been submitted for review. We'll add it to FunFinder732 once approved.
        </p>
        <Button onClick={() => { setSubmitted(false); setFormData({ eventName: "", date: "", time: "", location: "", description: "", category: "", cost: "", contactEmail: "", website: "" }); }}>
          Submit Another Event
        </Button>
      </div>
    );
  }

  return (
		<div className="gym-card p-8 max-w-xl md:max-w-2xl mx-auto">
			<h1 className="text-3xl text-[var(--ff-green)] font-bold mb-2">
				Submit an Event
			</h1>
			<p className="text-muted-foreground mb-6">
				Know of a family-friendly event in Monmouth County? Share it
				with the community!
			</p>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block font-medium mb-1">
						Event Name *
					</label>
					<input
						type="text"
						name="eventName"
						required
						value={formData.eventName}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						placeholder="e.g., Spring Family Festival"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div>
						<label className="block font-medium mb-1">Date *</label>
						<input
							type="date"
							name="date"
							required
							value={formData.date}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Time</label>
						<input
							type="text"
							name="time"
							value={formData.time}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
							placeholder="e.g., 10:00 AM - 2:00 PM"
						/>
					</div>
				</div>

				<div>
					<label className="block font-medium mb-1">Location *</label>
					<input
						type="text"
						name="location"
						required
						value={formData.location}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						placeholder="e.g., Thompson Park, Lincroft"
					/>
				</div>

				<div>
					<label className="block font-medium mb-1">Category *</label>
					<select
						name="category"
						required
						value={formData.category}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent">
						<option value="">Select a category</option>
						<option value="Arts & Crafts">Arts & Crafts</option>
						<option value="Sports">Sports</option>
						<option value="Nature">Nature</option>
						<option value="Music">Music</option>
						<option value="Education">Education</option>
						<option value="Festival">Festival</option>
						<option value="Holiday">Holiday</option>
						<option value="Other">Other</option>
					</select>
				</div>

				<div>
					<label className="block font-medium mb-1">Cost</label>
					<input
						type="text"
						name="cost"
						value={formData.cost}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						placeholder="e.g., Free, $10/family, $5/person"
					/>
				</div>

				<div>
					<label className="block font-medium mb-1">
						Description *
					</label>
					<textarea
						name="description"
						required
						value={formData.description}
						onChange={handleChange}
						rows={4}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent resize-none"
						placeholder="Tell us about the event..."
					/>
				</div>

				<div>
					<label className="block font-medium mb-1">
						Event Website
					</label>
					<input
						type="url"
						name="website"
						value={formData.website}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						placeholder="https://..."
					/>
				</div>

				<div>
					<label className="block font-medium mb-1">
						Your Email *
					</label>
					<input
						type="email"
						name="contactEmail"
						required
						value={formData.contactEmail}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ff-green)] focus:border-transparent"
						placeholder="your@email.com"
					/>
					<p className="text-sm text-muted-foreground mt-1">
						We'll only use this to contact you about your
						submission.
					</p>
				</div>

				<Button
					type="submit"
					className="bg-[var(--ff-green)] text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
					size="lg">
					<Send className="h-4 w-4 mr-2" />
					Submit Event
				</Button>
			</form>
		</div>
  );
}
