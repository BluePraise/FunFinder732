import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck, Clock4, Grid3x3, List, MapPin, Tag } from "lucide-react";

interface Activity {
  title: string;
  date: string;
  description: string;
  url: string;
  time: string;
  categories: string[];
  location: string;
}

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
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

    setFilteredActivities(filtered);
  }, [selectedCategory, selectedLocation, activities]);

  return (
    <div className="p-6">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Monmouth County Park Activities</h1>
              <p>Total events: {totalEvents} | Showing: {filteredActivities.length}</p>
              <p className="text-sm text-muted-foreground">Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A"} </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={layout === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("grid")}
                title="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setLayout("list")}
                title="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
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

            {(selectedCategory !== "All" || selectedLocation !== "All") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedLocation("All");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      <div className={layout === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}>
      {loading ? (
        <p>Loading activities...</p>
      ) : filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
             <Card key={index} className={layout === "list" ? "flex flex-row" : ""}>
              <div className={layout === "list" ? "flex-1" : ""}>
                <CardHeader>
                  <CardTitle className={layout === "list" ? "text-left" : "text-center"}>{activity.title}</CardTitle>
                  <hr />
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {activity.categories.map(cat => (
                        <span key={cat} className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <p className="flex gap-2 items-center"><MapPin className="h-4 w-4" /><span className="text-xs">{activity.location}</span></p>
                    <p className="flex gap-2 items-center"><CalendarCheck className="h-4 w-4" />{activity.date}</p>
                    <p className="flex gap-2 items-center"><Clock4 className="h-4 w-4" />{activity.time}</p>
                    <hr className="my-2" />
                    <p className="text-sm">{activity.description}</p>
                  </CardDescription>
                </CardContent>
              </div>
              <hr />
              <CardFooter>
              {/* <Link className={buttonVariants({ variant: "outline" })} href="{activity.url}">Click here</Link> */}
              </CardFooter>
            </Card>
          ))

      ) : (
        <p>No activities found.</p>
      )}

      </div>
    </div>
    </div>

  );
}

export default App;