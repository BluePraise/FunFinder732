import puppeteer from "puppeteer";

const BASE_URL = "https://www.monmouthcountyparks.com/EventCalendar.aspx?id=132&m=";
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1); // Generates [1, 2, ..., 12] for Jan-Dec

// Extract categories from event title and description
const extractCategories = (title: string, description: string) => {
  const text = `${title} ${description}`.toLowerCase();
  const categories: string[] = [];

  // Activity types
  const activityPatterns = [
    { pattern: /(open gym|gym)/i, category: "Open Gym" },
    { pattern: /(workshop|class)/i, category: "Workshop" },
    { pattern: /(concert|music|performance)/i, category: "Concert" },
    { pattern: /(hike|hiking|trail)/i, category: "Hiking" },
    { pattern: /(bird watching|birding)/i, category: "Bird Watching" },
    { pattern: /(yoga|fitness|exercise)/i, category: "Fitness" },
    { pattern: /(art|craft|painting|drawing)/i, category: "Arts & Crafts" },
    { pattern: /(nature|wildlife|outdoor)/i, category: "Nature" },
    { pattern: /(children|kids|family)/i, category: "Family" },
    { pattern: /(sports|basketball|soccer|tennis)/i, category: "Sports" },
  ];

  for (const { pattern, category } of activityPatterns) {
    if (pattern.test(text)) {
      categories.push(category);
    }
  }

  return categories.length > 0 ? categories : ["General"];
};

// Extract location from title
const extractLocation = (title: string) => {
  // Match "at [Location]" or "@ [Location]" patterns
  const atMatch = title.match(/(?:at|@)\s+(?:the\s+)?([^-]+?)(?:\s*$|\s*-)/i);
  if (atMatch) {
    return atMatch[1].trim();
  }

  // Match recreation center, park, or specific venues
  const venueMatch = title.match(/(\w+\s+(?:Recreation Center|Park|Center|Library|Arena|Field))/i);
  if (venueMatch) {
    return venueMatch[1].trim();
  }

  return "Various Locations";
};

const scrapeActivities = async () => {
  console.log("🚀 Running scraper...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  let allEvents: {
    title: string;
    url: string;
    date: string;
    time: string;
    description: string;
    categories: string[];
    location: string;
  }[] = [];
  let monthEventCounts: Record<number, number> = {}; // Stores event count per month

  for (const month of MONTHS) {
    const url = `${BASE_URL}${month}`;
    console.log(`🔍 Scraping: ${url}`);

    try {
      await page.goto(url, { waitUntil: "networkidle2" });
      console.log(`✅ Page loaded for month ${month}`);

      // Check if there are no activities
      const noEvents = await page.evaluate(() => {
        return document.body.innerText.includes("No Events Found");
      });

      if (noEvents) {
        console.warn(`⚠️ No events found for month ${month}, skipping.`);
        monthEventCounts[month] = 0;
        continue; // Skip to the next month
      }

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

      // Add categories and location to each event
      const enrichedEvents = events.map(event => ({
        ...event,
        categories: extractCategories(event.title, event.description),
        location: extractLocation(event.title)
      }));

      console.log(`📅 Found ${enrichedEvents.length} events for month ${month}`);
      allEvents = allEvents.concat(enrichedEvents);
      monthEventCounts[month] = enrichedEvents.length; // Store event count for this month
    } catch (error) {
      console.error(`❌ Error scraping ${url}:`, error);
    }
  }

  await browser.close();
  console.log(`🎉 Scraping complete! Found ${allEvents.length} total events.`);
  return { totalEvents: allEvents.length, events: allEvents, monthEventCounts };
};

export default scrapeActivities;
