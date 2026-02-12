import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Tag, DollarSign } from "lucide-react";

interface Activity {
  title: string;
  date: string;
  description: string;
  url: string;
  time: string;
  categories: string[];
  location: string;
  pricing: { isFree: boolean; cost: string | null; details: string | null };
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [showFreeOnly, setShowFreeOnly] = useState<boolean>(false);
  const [hidePastEvents, setHidePastEvents] = useState<boolean>(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:5005/activities")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched activities:", data);
        const events = data.cachedData.events;
        setActivities(events);
        setFilteredActivities(events);
        setTotalEvents(data.totalEvents);
        setLastUpdated(data.lastUpdated);

        // Extract unique categories and locations
        const categoriesSet = new Set<string>();
        const locationsSet = new Set<string>();

        events.forEach((event: Activity) => {
          event.categories.forEach(cat => categoriesSet.add(cat));
          locationsSet.add(event.location);
        });

        setAvailableCategories(Array.from(categoriesSet).sort());
        setAvailableLocations(Array.from(locationsSet).sort());
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  // Filter activities when filters change
  useEffect(() => {
    let filtered = activities;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(activity =>
        activity.categories.includes(selectedCategory)
      );
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter(activity =>
        activity.location === selectedLocation
      );
    }

    if (showFreeOnly) {
      filtered = filtered.filter(activity => activity.pricing.isFree);
    }

    if (hidePastEvents) {
      filtered = filtered.filter(activity => !isPastDate(activity.date));
    }

    setFilteredActivities(filtered);
  }, [selectedCategory, selectedLocation, showFreeOnly, hidePastEvents, activities]);

  // Helper function to check if event date has passed
  const isPastDate = (dateString: string): boolean => {
    try {
      const eventDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      return eventDate < today;
    } catch {
      return false;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Monmouth County Park Activities</h1>
            <p>Total events: {totalEvents} | Showing: {filteredActivities.length}</p>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A"} </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <label className="font-medium">Category:</label>
              <select
                className="px-3 py-1 rounded border bg-background"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <label className="font-medium">Location:</label>
              <select
                className="px-3 py-1 rounded border bg-background"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFreeOnly}
                  onChange={(e) => setShowFreeOnly(e.target.checked)}
                  className="cursor-pointer"
                />
                <span className="font-medium">Free Events Only</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hidePastEvents}
                  onChange={(e) => setHidePastEvents(e.target.checked)}
                  className="cursor-pointer"
                />
                <span className="font-medium">Hide Past Events</span>
              </label>
            </div>

            {(selectedCategory !== "All" || selectedLocation !== "All" || showFreeOnly || hidePastEvents) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                  setShowFreeOnly(false);
                  setHidePastEvents(false);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading activities...</p>
          ) : filteredActivities.length > 0 ? (
            <table className="w-full border-collapse bg-background">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Event</th>
                  <th className="text-left p-3 font-semibold">Date & Time</th>
                  <th className="text-left p-3 font-semibold">Location</th>
                  <th className="text-left p-3 font-semibold">Categories</th>
                  <th className="text-left p-3 font-semibold">Price</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity, index) => {
                  const isPast = isPastDate(activity.date);
                  return (
                    <tr
                      key={index}
                      className={`border-b hover:bg-muted/50 ${isPast ? 'opacity-50 text-muted-foreground' : ''}`}
                    >
                      <td className="p-3">
                        <div className="font-medium">{activity.title}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">{activity.date}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {activity.categories.map(cat => (
                            <span key={cat} className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">
                        {activity.pricing.cost ? (
                          <span className={activity.pricing.isFree ? "font-semibold text-green-600" : "text-sm"}>
                            {activity.pricing.cost}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="text-sm max-w-md line-clamp-3">{activity.description}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No activities found.</p>
          )}
        </div>
    </div>
    </div>

  );
}

export default App;