# AETHER 2030 — Hyper-Cinematic Weather Intelligence

Next-generation meteorological interface built with modern vanilla JavaScript, Tailwind CSS via CDN, and a dynamic city backdrop crossfade engine.

---

## ✨ Features

- **Dynamic City Backdrop Engine**: Searches instantly update the full-screen cinematic backdrop to an authentic high-resolution photograph of the queried city (using curated 4K Unsplash panoramas for major global metropolises with an automatic high-res Wikipedia photographic archive fallback for any city worldwide).
- **Dual-Layer Crossfader**: Zero flash or blank frames when switching cities; transitions with a smooth cinematic 1.2s dissolve.
- **Precision Meteorological Telemetry**:
  - Live temperature with high-res animated weather icons & condition descriptors.
  - Feels-like temperature, dynamic comfort index, and min/max ranges.
  - Wind speed & direction with live rotating compass needle (`°` orientation).
  - Humidity meter with comfort rating and estimated dew point.
  - Atmospheric pressure (hPa) & sea-level/ground-level elevation barometer.
  - Cloud cover density progress gauge.
  - Visibility range assessment.
  - Sunrise & Sunset times with daylight timeline.
- **Running Local Time Clock**: Live city-accurate local time calculated directly from OpenWeather UTC offset (`timezone`).
- **5-Day / 3-Hour Forecast Trajectory**: Hourly forecast cards with weather conditions, icons, and temperature forecasts.
- **Atmospheric Canvas Simulator**: Dynamic canvas particle simulation matching live weather conditions (gentle rain streaks, floating snow flakes, or solar shimmer).
- **Metric / Imperial Unit Toggle**: Instant conversion between Celsius (°C / km/h) and Fahrenheit (°F / mph).
- **GPS Geolocation Integration**: Auto-detect local weather via browser geolocation.
- **Favorites System**: Pin cities to the quick-access favorites tray with `localStorage` persistence.

---

## 🛠️ Tech Stack

- **Styling**: Tailwind CSS (via CDN) + Custom Glassmorphism CSS (`style.css`)
- **Fonts**: Plus Jakarta Sans & Space Grotesk
- **Icons**: Font Awesome 6.5
- **APIs**: OpenWeatherMap API (Current Weather + 5-Day Forecast) & Wikipedia PageImages API
