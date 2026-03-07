import { Bookmark } from "lucide-react";

export default function SavedPanel() {
  return (
    <div className="gym-card p-5 text-center sticky top-6">
      <div className="flex justify-center mb-3">
        <div className="gym-icon green">
          <Bookmark className="h-5 w-5 text-[var(--ff-green)]" />
        </div>
      </div>
      <h3 className="text-sm font-bold text-[var(--ff-green)] mb-1">Save Events</h3>
      <p className="text-xs text-[var(--ff-gray)] leading-snug">
        Coming soon — build your own list of events you're interested in.
      </p>
    </div>
  );
}
