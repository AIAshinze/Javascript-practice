# TravelBloom — Travel Recommendation App

A front-end travel recommendation web application that allows users to search for popular travel destinations including beaches, temples, and countries. The app dynamically fetches destination data from a local JSON file and displays results with images, descriptions, and real-time local times for each recommended place.

---

## Features

- Keyword-based destination search (beaches, temples, countries, or specific country names)
- Case-insensitive search using `toLowerCase()` string manipulation
- Dynamic result cards with destination image, name, and description
- Real-time local time display for each recommended destination
- Clear button to reset the search input and results
- Enter key support for triggering search from the keyboard
- Multi-page layout: Home, About Us, and Contact Us
- Frosted-glass UI components with smooth fade-in animations
- Social media sidebar with icons (X, Facebook, Instagram, YouTube)
- Fully responsive design for desktop, tablet, and mobile

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `travel_recommendation.html` | Hero section, search bar, and results display |
| About Us | `about_us.html` | Company intro and team member cards |
| Contact Us | `travel_contact.html` | Contact form with name, email, and message fields |

---

## Project Structure

```
TravelBloom/
├── travel_recommendation.html
├── about_us.html
├── contact_us.html
├── style.css
├── travel_recommendation.js
├── travel_recommendation_api.json
└── images/
    ├── inspire-studio-travel-6913775.svg
    └── (destination images...)
```

---

## Search Keywords

The search bar on the home page accepts the following keywords:

| Keyword | Variations Accepted | Returns |
|---|---|---|
| Beach | `beach`, `beaches`, `Beach`, `BEACH` | All beach destinations |
| Temple | `temple`, `temples`, `Temple`, `TEMPLE` | All temple destinations |
| Country | `country`, `countries` | Cities from all countries |
| Country name | `japan`, `Japan`, `JAPAN` | Cities within that country |

---

## How It Works

1. The user types a keyword into the search bar in the navbar
2. On clicking **Search** (or pressing **Enter**), `searchDestination()` is called
3. The function fetches `travel_recommendation_api.json` using the Fetch API
4. The keyword is normalised with `.trim().toLowerCase()` and matched against the JSON categories
5. Matched results are passed to `displayResults()`, which builds and injects result cards into the page
6. Each card shows the destination image, name, description, and current local time fetched via `toLocaleTimeString()`
7. Clicking **Clear** empties the input field and removes all results from the page

---

## Technologies Used

- **HTML5** — page structure and semantic markup
- **CSS3** — custom properties, flexbox, animations, backdrop blur, responsive media queries
- **Vanilla JavaScript** — Fetch API, DOM manipulation, event handling, date/time formatting
- **Font Awesome 6** — icons for social media, search, clock, and navigation
- **Google Fonts** — Playfair Display (headings) and DM Sans (body text)

---

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A web browser with DevTools (Chrome, Firefox, etc.)
- A local development server to serve the JSON file (e.g. VS Code Live Server extension),
  since the Fetch API cannot load local files directly over the `file://` protocol

---

## Getting Started

1. Clone or download the repository
2. Open the project folder in VS Code
3. Install the **Live Server** extension if you don't have it
4. Right-click `index.html` and select **Open with Live Server**
5. Type a keyword such as `beach`, `temple`, `Japan`, or `country` into the search bar and click **Search**

---

## Data Source

Destination data is stored locally in `travel_recommendation_api.json` and organised into
three categories — `beaches`, `temples`, and `countries` (each country containing an array
of cities). Each entry includes a `name`, `imageUrl`, and `description` field.

Webpage images are sourced/available for free on pixabay.com

---

## Author

**Ashinze Ifechukwude Anthony**  
ML/AI Engineer — Lagos, Nigeria