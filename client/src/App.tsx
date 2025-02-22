import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState<{ title: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/activities")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching activities:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">FunFinder-732: Upcoming Activities</h1>

      {loading ? (
        <p>Loading activities...</p>
      ) : activities.length > 0 ? (
        <ul className="mt-4">
          {activities.map((activity, index) => (
            <li key={index} className="border p-3 my-2 rounded-md">
              <strong>{activity.title}</strong>
              <p>{activity.date}</p>
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