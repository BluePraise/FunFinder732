const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://reg.monmouthcountyparks.com/Search2.aspx";

const scrapeActivities = async () => {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    let activities = [];

    $(".activityClass").each((i, el) => {
      const title = $(el).find(".activityTitle").text().trim();
      const date = $(el).find(".activityDate").text().trim();
      const location = $(el).find(".activityLocation").text().trim();

      if (title) {
        activities.push({ title, date, location });
      }
    });

    return activities;
  } catch (error) {
    console.error("Error scraping data:", error);
  }
};

// Run scraper
scrapeActivities().then((data) => console.log(data));

module.exports = { scrapeActivities };