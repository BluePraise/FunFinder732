import puppeteer from "puppeteer";

const scrapeActivities = async () => {
  console.log("🚀 Running scraper...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.monmouthcountyparks.com/EventCalendar.aspx?id=132&m=2", { waitUntil: "networkidle2" });

  const events = await page.evaluate(() => {
    let eventList: { title: string; url: string; date: string; time: string; description: string }[] = [];
    const rows = Array.from(document.querySelectorAll("tr"));

    for (let i = 0; i < rows.length - 1; i++) {
      const titleRow = rows[i];
      const detailsRow = rows[i + 1]; // The next <tr> contains date, time, description
      const titleElement = titleRow.querySelector(".TitleEventCal a");
      if (titleElement && detailsRow) {
        const title = titleElement.textContent?.trim() || "Untitled Event";
        const url = titleElement.getAttribute("href") || "#";

        // Extract date
        const dateElement = detailsRow.querySelector("td p strong");
        const date = dateElement?.textContent?.trim() || "Unknown Date";

        // Extract time
        const timeElement = detailsRow.querySelector(".SmallTextCal");
        const time = timeElement?.textContent?.trim() || "Unknown Time";

        // Extract description
        const descriptionElement = detailsRow.querySelector("td:nth-child(2)");
        const description = descriptionElement?.textContent?.trim() || "No description available.";

        eventList.push({ title, url, date, time, description });
      }
    }

    return eventList;
  });

  await browser.close();
  console.log("events", events);
  console.log(`✅ Scraper finished. Found ${events.length} events.`);
  return events;
};

export default scrapeActivities;
