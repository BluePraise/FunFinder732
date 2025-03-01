import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<{ title: string; date: string, description: string, url: string, time: string }[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/activities")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched activities:", data);
        setActivities(data.cachedData.events);
        setTotalEvents(data.totalEvents);
        setLastUpdated(data.lastUpdated);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Monmouth County Park Activities</h1>
      <p>Total events in monmouth county this year: {totalEvents}</p>
      <p>Last updated: {lastUpdated ? lastUpdated.toLocaleString() : "N/A"} </p>
      {loading ? (
        <p>Loading activities...</p>
      ) : activities.length > 0 ? (
        <ul className="mt-4">
          {activities.map((activity, index) => (
            <li key={index} className="border p-3 my-2 rounded-md card">
              <strong>{activity.title}</strong>
              <p>{activity.date}</p>
              <p>{activity.time}</p>
              <p>{activity.description}</p>
              <a href={activity.url}>Click here to register</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
}

export default App;