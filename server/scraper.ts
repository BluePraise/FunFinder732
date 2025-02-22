import puppeteer from "puppeteer";

const scrapeActivities = async () => {
  console.log("🚀 Running scraper...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.monmouthcountyparks.com/EventCalendar.aspx?id=132&m=1", { waitUntil: "networkidle2" });

  const events = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".DayCal a")).map(el => ({
      title: el.getAttribute("title") || "No title",
      date: el.innerText.trim(),
    }));
  });

  await browser.close();
  console.log("✅ Scraper finished.");
  return events;
};

// ✅ Export as default
export default scrapeActivities;