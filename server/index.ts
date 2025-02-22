import express from "express";
import cors from "cors";
import scrapeActivities from "./scraper.js";

const app = express();
app.use(cors());
app.use(express.json());

let cachedActivities = [];
let lastUpdated = null;

const updateActivities = async () => {
  console.log("🔄 Fetching fresh activity data...");
  cachedActivities = await scrapeActivities();
  lastUpdated = new Date();
};

// Run the scraper once on startup
updateActivities();

app.get("/activities", async (req, res) => {
  if (!lastUpdated || new Date() - lastUpdated > 12 * 60 * 60 * 1000) {
    await updateActivities();
  }
  res.json(cachedActivities);
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
