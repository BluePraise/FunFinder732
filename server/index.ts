import express from "express";
import cors from "cors";
import scrapeActivities from "./scraper.js"; // Ensure correct import

const app = express();
app.use(cors());
app.use(express.json());

let lastUpdated: Date | null = null;

let cachedData: {
  totalEvents: number;
  events: {
    title: string;
    url: string;
    date: string;
    time: string;
    description: string;
    categories: string[];
    location: string;
    pricing: { isFree: boolean; cost: string | null; details: string | null };
  }[];
  monthEventCounts: Record<number, number>;
} | null = null;

const updateActivities = async () => {
  console.log("🔄 Fetching fresh activity data...");
  cachedData = await scrapeActivities();
  lastUpdated = new Date();
};

// Run the scraper once on startup
updateActivities();

app.get("/activities", async (req, res) => {
  if (!lastUpdated || new Date().getTime() - lastUpdated.getTime() > 12 * 60 * 60 * 1000) {
    await updateActivities();
  }
  res.json(
    {
      cachedData,
      lastUpdated
    }
  );
});

// API endpoint for status
app.get("/status", (req, res) => {
  res.json({
    serverTime: new Date().toISOString()
  });
});

const PORT = 5005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
