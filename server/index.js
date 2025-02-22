const express = require("express");
const cors = require("cors");
const { scrapeActivities } = require("./scraper.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/activities", async (req, res) => {
  const activities = await scrapeActivities();
  res.json(activities);
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));