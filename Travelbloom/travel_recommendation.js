// ============================================================
//  TravelBloom — travel_recommendation.js
// ============================================================

// ── 1. TIMEZONE MAP ─────────────────────────────────────────
// Maps every place name (lowercase) to its IANA timezone string
const timezoneMap = {
  // Beaches
  "bora bora, french polynesia": "Pacific/Tahiti",
  "copacabana beach, brazil":    "America/Sao_Paulo",

  // Temples
  "angkor wat, cambodia":        "Asia/Phnom_Penh",
  "taj mahal, india":            "Asia/Kolkata",

  // Countries → cities
  "sydney, australia":           "Australia/Sydney",
  "melbourne, australia":        "Australia/Melbourne",
  "tokyo, japan":                "Asia/Tokyo",
  "kyoto, japan":                "Asia/Tokyo",
  "rio de janeiro, brazil":      "America/Sao_Paulo",
  "são paulo, brazil":           "America/Sao_Paulo",
};

// ── 2. GET LOCAL TIME FOR A PLACE ───────────────────────────
/**
 * Returns a formatted local-time string for a given place name.
 * Falls back to a generic message if no timezone is mapped.
 * @param {string} placeName - The place name exactly as stored in the JSON
 * @returns {string} - Formatted time string
 */
function getLocalTime(placeName) {
  const timezone = timezoneMap[placeName.toLowerCase()];

  if (!timezone) {
    return "Local time unavailable";
  }

  const options = {
    timeZone: timezone,
    hour12:   true,
    hour:     "numeric",
    minute:   "numeric",
    second:   "numeric",
  };

  const localTime = new Date().toLocaleTimeString("en-US", options);
  console.log(`Current time in ${placeName}:`, localTime);
  return localTime;
}

// ── 3. BUILD A RESULT CARD ───────────────────────────────────
/**
 * Creates and returns an HTML string for a single result card.
 * @param {string} name        - Place name
 * @param {string} imageUrl    - Path to the place image
 * @param {string} description - Short description of the place
 * @returns {string} - HTML string for one card
 */
function buildCard(name, imageUrl, description) {
  const localTime = getLocalTime(name);

  return `
    <div class="result-card">
      <img src="${imageUrl}" alt="${name}">
      <div class="result-card-body">
        <h3 class="result-card-title">${name}</h3>
        <p class="result-card-desc">${description}</p>
        <p class="result-card-time">
          <i class="fa fa-clock"></i> Local time: ${localTime}
        </p>
      </div>
    </div>
  `;
}

// ── 4. DISPLAY RESULTS ──────────────────────────────────────
/**
 * Injects the results heading and result cards into the #result div.
 * @param {Array}  items  - Array of place objects to display
 * @param {string} label  - Category label shown in the heading
 */
function displayResults(items, label) {
  const resultDiv = document.getElementById("result");

  const cardsHTML = items
    .map((item) => buildCard(item.name, item.imageUrl, item.description))
    .join("");

  resultDiv.innerHTML = `
    <div class="results-header">
      <h2 class="results-title">Search Results</h2>
      <p class="results-label">Showing results for: <span>${label}</span></p>
    </div>
    <div class="results-grid">
      ${cardsHTML}
    </div>
  `;

  resultDiv.scrollIntoView({ behavior: "smooth" });
}

// ── 5. SHOW "NOT FOUND" MESSAGE ──────────────────────────────
function showNotFound(keyword) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="results-header">
      <h2 class="results-title">Search Results</h2>
      <p class="results-not-found">
        No results found for "<strong>${keyword}</strong>". 
        Try searching for <em>beach</em>, <em>temple</em>, 
        <em>country</em>, or a specific country name like 
        <em>Japan</em>, <em>Brazil</em>, or <em>Australia</em>.
      </p>
    </div>
  `;
  resultDiv.scrollIntoView({ behavior: "smooth" });
}

// ── 6. MAIN SEARCH FUNCTION ──────────────────────────────────
/**
 * Fetches the JSON, normalises the keyword, and routes to the
 * correct data category (beach / temple / country / country name).
 */
function searchDestination() {
  const rawInput = document.getElementById("conditionInput").value;
  const keyword  = rawInput.trim().toLowerCase();

  if (!keyword) return;

  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {

      console.log("JSON data loaded successfully:", data);

      let matchedItems = [];
      let label        = "";

      // BEACH / BEACHES
      if (keyword === "beach" || keyword === "beaches") {
        matchedItems = data.beaches;
        label = "Beaches";

      // TEMPLE / TEMPLES
      } else if (keyword === "temple" || keyword === "temples") {
        matchedItems = data.temples;
        label = "Temples";

      // COUNTRY / COUNTRIES → all cities from all countries
      } else if (keyword === "country" || keyword === "countries") {
        data.countries.forEach((country) => {
          matchedItems = matchedItems.concat(country.cities);
        });
        label = "Countries";

      // SPECIFIC COUNTRY NAME (e.g. "japan", "brazil", "australia")
      } else {
        const matched = data.countries.find(
          (country) => country.name.toLowerCase() === keyword
        );

        if (matched) {
          matchedItems = matched.cities;
          label = matched.name;
        }
      }

      if (matchedItems.length > 0) {
        displayResults(matchedItems, label);
      } else {
        showNotFound(rawInput.trim());
      }
    })
    .catch((error) => {
      console.error("Error fetching travel data:", error);
      document.getElementById("result").innerHTML = `
        <div class="results-header">
          <p class="results-not-found">
            Something went wrong while fetching data. Please try again.
          </p>
        </div>
      `;
    });
}

// ── 7. CLEAR FUNCTION ────────────────────────────────────────
/**
 * Clears the search input field and wipes the results section.
 */
function clearResults() {
  document.getElementById("conditionInput").value = "";
  document.getElementById("result").innerHTML = "";
}

// ── 8. EVENT LISTENERS ───────────────────────────────────────
document.getElementById("btnSearch").addEventListener("click", searchDestination);
document.getElementById("btnClear").addEventListener("click", clearResults);

document.getElementById("conditionInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchDestination();
});