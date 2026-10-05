/**
 * AETHER WEATHER — Apple Weather Edition Engine
 * Precision meteorological telemetry with dynamic city backdrops,
 * hourly forecasts, Apple-style 5-day temperature range bars, and interactive SVG gauges.
 */

const CONFIG = {
    apiKey: "a0d0437359614a2aed2ad457d9293c50",
    defaultCity: "Mumbai",
    unit: "metric", // 'metric' or 'imperial'
};

// CURATED 4K ULTRA-HD CITY BACKDROPS (Instant zero-latency load for major world cities)
const CURATED_CITY_WALLPAPERS = {
    "mumbai": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=2000&q=80",
    "delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=2000&q=80",
    "tokyo": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&q=80",
    "new york": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&q=80",
    "london": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
    "paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80",
    "dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
    "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&q=80",
    "sydney": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=80",
    "san francisco": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80",
    "rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2000&q=80",
    "berlin": "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=2000&q=80",
    "toronto": "https://images.unsplash.com/photo-1517935703635-2717090c2226?auto=format&fit=crop&w=2000&q=80",
    "bangkok": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2000&q=80",
    "seoul": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2000&q=80",
    "hong kong": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=2000&q=80",
    "los angeles": "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=2000&q=80",
    "chicago": "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=2000&q=80",
    "barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80",
    "amsterdam": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=2000&q=80",
    "cairo": "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=2000&q=80",
    "istanbul": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=2000&q=80",
    "kyoto": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=80",
    "rio de janeiro": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=2000&q=80",
    "zurich": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&w=2000&q=80",
};

// ATMOSPHERIC FALLBACKS BASED ON WEATHER CONDITION
const WEATHER_FALLBACK_WALLPAPERS = {
    "Clear": "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=2000&q=80",
    "Clouds": "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80",
    "Rain": "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=2000&q=80",
    "Drizzle": "https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&w=2000&q=80",
    "Thunderstorm": "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=2000&q=80",
    "Snow": "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=2000&q=80",
    "Mist": "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=2000&q=80",
    "Fog": "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=2000&q=80",
};

const POPULAR_CITIES = ["Mumbai", "Tokyo", "New York", "London", "Paris", "Dubai"];

// APPLICATION STATE
let state = {
    currentCity: "Mumbai",
    unit: "metric",
    currentData: null,
    forecastData: null,
    timezoneOffset: 0,
    activeBgLayer: 1,
    localTimeTimer: null,
    weatherCondition: "Clear",
};

// -------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initPopularChips();
    initWeatherCanvas();
    fetchWeather(CONFIG.defaultCity);

    // Keyboard shortcut '/' to search
    window.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
            e.preventDefault();
            document.getElementById("cityInput").focus();
        }
    });
});

// -------------------------------------------------------------
// METEOROLOGICAL API INTEGRATION
// -------------------------------------------------------------
async function fetchWeather(city) {
    showLoading(true);
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${state.unit}&appid=${CONFIG.apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            showToast(`City "${city}" not found.`, "error");
            showLoading(false);
            return;
        }

        state.currentCity = data.name;
        state.currentData = data;
        state.timezoneOffset = data.timezone;
        state.weatherCondition = data.weather[0].main;

        // Render Telemetry
        renderCurrentWeather(data);

        // Fetch 5-Day / 3-Hour Forecast
        fetchForecast(city);

        // Update Background with authentic city photo
        updateCityBackground(data.name, data.weather[0].main);

        // Update local time clock
        startLocalClock();

        document.getElementById("cityInput").value = "";
    } catch (err) {
        console.error("Weather fetch failed:", err);
        showToast("Error updating weather data.", "error");
    } finally {
        showLoading(false);
    }
}

async function fetchForecast(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${state.unit}&cnt=40&appid=${CONFIG.apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === "200") {
            state.forecastData = data;
            renderHourlyForecast(data.list.slice(0, 6));
            render5DayForecast(data.list);
            renderMiniTempWave(data.list.slice(0, 8));
        }
    } catch (err) {
        console.error("Forecast fetch failed:", err);
    }
}

function fetchCurrentLocationWeather() {
    if (!navigator.geolocation) {
        showToast("Geolocation not supported.", "error");
        return;
    }

    showToast("Locating coordinates...", "info");
    showLoading(true);

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${state.unit}&appid=${CONFIG.apiKey}`;
                const res = await fetch(url);
                const data = await res.json();

                if (data.cod === 200) {
                    state.currentCity = data.name;
                    state.currentData = data;
                    state.timezoneOffset = data.timezone;
                    state.weatherCondition = data.weather[0].main;

                    renderCurrentWeather(data);
                    fetchForecast(data.name);
                    updateCityBackground(data.name, data.weather[0].main);
                    startLocalClock();
                    showToast(`Location: ${data.name}, ${data.sys.country}`, "success");
                }
            } catch (e) {
                showToast("Failed to fetch weather for GPS coordinates.", "error");
            } finally {
                showLoading(false);
            }
        },
        (error) => {
            showLoading(false);
            showToast("Location access denied or unavailable.", "error");
        },
        { timeout: 10000 }
    );
}

// -------------------------------------------------------------
// DYNAMIC CITY BACKDROP SYSTEM (Core Requirement)
// -------------------------------------------------------------
async function updateCityBackground(cityName, weatherCondition) {
    const cleanCity = cityName.toLowerCase().trim();
    let imageUrl = null;
    let photoCredit = `${cityName} Skyline`;

    if (CURATED_CITY_WALLPAPERS[cleanCity]) {
        imageUrl = CURATED_CITY_WALLPAPERS[cleanCity];
        photoCredit = `${cityName} • Curated 4K Panorama`;
    } else {
        try {
            const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&origin=*&piprop=original&titles=${encodeURIComponent(cityName)}`;
            const res = await fetch(wikiUrl);
            const data = await res.json();
            const pages = data.query?.pages;

            if (pages) {
                const firstPage = Object.values(pages)[0];
                if (firstPage && firstPage.original && firstPage.original.source) {
                    imageUrl = firstPage.original.source;
                    photoCredit = `${cityName} • Photographic Archive`;
                }
            }
        } catch (e) {
            console.warn("Wikipedia image lookup failed, falling back:", e);
        }

        if (!imageUrl) {
            imageUrl = WEATHER_FALLBACK_WALLPAPERS[weatherCondition] || WEATHER_FALLBACK_WALLPAPERS["Clear"];
            photoCredit = `${cityName} • Atmospheric Simulation`;
        }
    }

    preloadAndCrossfade(imageUrl, photoCredit);
}

function preloadAndCrossfade(imageUrl, photoCredit) {
    const preloader = new Image();
    preloader.src = imageUrl;

    preloader.onload = () => {
        const layer1 = document.getElementById("bgLayer1");
        const layer2 = document.getElementById("bgLayer2");

        if (state.activeBgLayer === 1) {
            layer2.style.backgroundImage = `url("${imageUrl}")`;
            layer2.classList.remove("inactive");
            layer2.classList.add("active");

            layer1.classList.remove("active");
            layer1.classList.add("inactive");
            state.activeBgLayer = 2;
        } else {
            layer1.style.backgroundImage = `url("${imageUrl}")`;
            layer1.classList.remove("inactive");
            layer1.classList.add("active");

            layer2.classList.remove("active");
            layer2.classList.add("inactive");
            state.activeBgLayer = 1;
        }

        const creditEl = document.getElementById("photoCreditText");
        if (creditEl) {
            creditEl.innerHTML = `Backdrop: <strong>${photoCredit}</strong>`;
        }
    };

    preloader.onerror = () => {
        const fallback = WEATHER_FALLBACK_WALLPAPERS[state.weatherCondition] || WEATHER_FALLBACK_WALLPAPERS["Clear"];
        const layer = document.getElementById(`bgLayer${state.activeBgLayer}`);
        if (layer) layer.style.backgroundImage = `url("${fallback}")`;
    };
}

// -------------------------------------------------------------
// LUMINOUS VIBRANT WEATHER ICON MAPPER
// -------------------------------------------------------------
function getLuminousWeatherIcon(iconCode, condition) {
    const isNight = iconCode && iconCode.endsWith("n");
    const cond = (condition || "").toLowerCase();

    if (cond.includes("thunder") || iconCode === "11d" || iconCode === "11n") {
        return `<i class="fas fa-bolt text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]"></i>`;
    }
    if (cond.includes("rain") || cond.includes("drizzle") || iconCode.startsWith("09") || iconCode.startsWith("10")) {
        return `<i class="fas fa-cloud-rain text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"></i>`;
    }
    if (cond.includes("snow") || iconCode.startsWith("13")) {
        return `<i class="fas fa-snowflake text-sky-200 drop-shadow-[0_0_12px_rgba(186,230,253,0.6)]"></i>`;
    }
    if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze") || iconCode.startsWith("50")) {
        return `<i class="fas fa-smog text-slate-300"></i>`;
    }
    if (cond.includes("cloud")) {
        if (isNight) {
            return `<i class="fas fa-cloud-moon text-indigo-200 drop-shadow-[0_0_10px_rgba(165,180,252,0.5)]"></i>`;
        }
        return `<i class="fas fa-cloud-sun text-amber-300 drop-shadow-[0_0_12px_rgba(253,230,138,0.5)]"></i>`;
    }
    // Clear
    if (isNight) {
        return `<i class="fas fa-moon text-indigo-200 drop-shadow-[0_0_15px_rgba(165,180,252,0.8)]"></i>`;
    }
    return `<i class="fas fa-sun text-amber-400 drop-shadow-[0_0_18px_rgba(251,191,36,0.8)]"></i>`;
}

// -------------------------------------------------------------
// TELEMETRY UI RENDERING
// -------------------------------------------------------------
function renderCurrentWeather(data) {
    const { name, sys, main, weather, wind, visibility } = data;
    const cond = weather[0];
    const isMetric = state.unit === "metric";
    const tempUnit = isMetric ? "°C" : "°F";
    const speedUnit = isMetric ? "km/h" : "mph";

    // Top Header info
    document.getElementById("cityName").textContent = name;
    document.getElementById("countryBadge").textContent = sys.country || "--";
    document.getElementById("weatherDesc").textContent = cond.description;

    // Luminous Icon
    const iconContainer = document.getElementById("weatherIconContainer");
    if (iconContainer) {
        iconContainer.innerHTML = getLuminousWeatherIcon(cond.icon, cond.main);
    }

    // Main Temperature
    document.getElementById("mainTemp").innerHTML = `${Math.round(main.temp)}°`;
    document.getElementById("tempMinMax").innerHTML = `H: ${Math.round(main.temp_max)}° L: ${Math.round(main.temp_min)}°`;

    // Sunrise & Sunset
    if (sys.sunrise && sys.sunset) {
        document.getElementById("sunriseTime").textContent = formatEpochToCityTime(sys.sunrise, data.timezone);
        document.getElementById("sunsetTime").textContent = formatEpochToCityTime(sys.sunset, data.timezone);
        updateSunArcDot(sys.sunrise, sys.sunset, data.timezone);
    }

    // Wind
    const windSpeedVal = isMetric ? Math.round(wind.speed * 3.6) : Math.round(wind.speed);
    document.getElementById("windSpeed").innerHTML = `${windSpeedVal} <span class="text-xs font-normal text-white/60">${speedUnit}</span>`;
    const windDeg = wind.deg || 0;
    document.getElementById("windDirText").textContent = getWindCardinal(windDeg);
    document.getElementById("compassNeedle").style.transform = `rotate(${windDeg}deg)`;
    document.getElementById("windBeaufort").textContent = windSpeedVal < 12 ? "Light air" : windSpeedVal < 28 ? "Gentle breeze" : windSpeedVal < 40 ? "Moderate breeze" : "Strong wind";
    document.getElementById("windGustText").textContent = `${windDeg}° azimuth`;

    // Humidity
    document.getElementById("humidityVal").textContent = `${main.humidity}%`;
    const dewPoint = Math.round(main.temp - ((100 - main.humidity) / 5));
    document.getElementById("dewPointVal").textContent = `Dew: ${dewPoint}${tempUnit}`;
    const ringEl = document.getElementById("humidityRingCircle");
    if (ringEl) {
        const pct = Math.max(0, Math.min(100, main.humidity));
        ringEl.setAttribute("stroke-dasharray", `${pct}, 100`);
    }
    const humRating = document.getElementById("humidityRating");
    if (humRating) {
        humRating.textContent = main.humidity > 75 ? "High Humidity" : main.humidity < 35 ? "Dry Atmosphere" : "Comfortable Air";
    }

    // Feels Like
    const feelsLikeVal = Math.round(main.feels_like);
    document.getElementById("feelsLikeVal").textContent = `${feelsLikeVal}°`;
    if (feelsLikeVal > Math.round(main.temp)) {
        document.getElementById("feelsLikeDesc").textContent = "Humidity makes it feel warmer.";
    } else if (feelsLikeVal < Math.round(main.temp)) {
        document.getElementById("feelsLikeDesc").textContent = "Wind factor makes it feel cooler.";
    } else {
        document.getElementById("feelsLikeDesc").textContent = "Similar to actual temp.";
    }
    document.getElementById("comfortRating").textContent = evaluateComfort(main.temp, main.humidity, isMetric);

    // Visibility
    const visKm = visibility ? (visibility / 1000).toFixed(0) : 10;
    const visText = isMetric ? `${visKm} km` : `${(visKm * 0.621371).toFixed(0)} mi`;
    document.getElementById("visibilityVal").innerHTML = `${visText}`;
    document.getElementById("visibilityDesc").textContent = visibility >= 9000 ? "Perfect atmospheric clarity." : visibility >= 5000 ? "Moderate optical haze." : "Reduced optical visibility.";

    // Pressure
    document.getElementById("pressureVal").innerHTML = `${main.pressure} <span class="text-[10px] font-normal text-white/60">hPa</span>`;

    setWeatherParticleState(cond.main);
}

// -------------------------------------------------------------
// APPLE WEATHER HOURLY FORECAST STRIP
// -------------------------------------------------------------
function renderHourlyForecast(hourlyList) {
    const strip = document.getElementById("hourlyForecastStrip");
    if (!strip || !hourlyList) return;

    strip.innerHTML = hourlyList.map((item, idx) => {
        const date = new Date((item.dt + state.timezoneOffset) * 1000);
        const timeLabel = idx === 0 ? "Now" : date.toLocaleTimeString("en-US", { hour: "numeric", hour12: true, timeZone: "UTC" });
        const temp = Math.round(item.main.temp);
        const iconHtml = getLuminousWeatherIcon(item.weather[0].icon, item.weather[0].main);

        return `
            <div class="flex flex-col items-center justify-between py-0.5">
                <span class="text-[9px] text-white/70 font-medium">${timeLabel}</span>
                <div class="my-1 text-xs">${iconHtml}</div>
                <span class="text-[11px] font-semibold text-white">${temp}°</span>
            </div>
        `;
    }).join("");
}

// -------------------------------------------------------------
// APPLE WEATHER 5-DAY FORECAST WITH TEMPERATURE RANGE BARS
// -------------------------------------------------------------
function render5DayForecast(fullList) {
    const container = document.getElementById("dailyForecastList");
    if (!container || !fullList) return;

    const dayGroups = {};
    fullList.forEach(item => {
        const date = new Date((item.dt + state.timezoneOffset) * 1000);
        const dayKey = date.toISOString().split("T")[0];
        if (!dayGroups[dayKey]) dayGroups[dayKey] = [];
        dayGroups[dayKey].push(item);
    });

    const dailyDays = Object.keys(dayGroups).slice(0, 5);

    let globalMin = Infinity;
    let globalMax = -Infinity;
    dailyDays.forEach(day => {
        const items = dayGroups[day];
        items.forEach(it => {
            if (it.main.temp_min < globalMin) globalMin = it.main.temp_min;
            if (it.main.temp_max > globalMax) globalMax = it.main.temp_max;
        });
    });

    const totalRange = (globalMax - globalMin) || 1;

    container.innerHTML = dailyDays.map((dayKey, idx) => {
        const items = dayGroups[dayKey];
        const dayDate = new Date((items[0].dt + state.timezoneOffset) * 1000);
        const dayName = idx === 0 ? "Today" : dayDate.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
        
        let min = Math.min(...items.map(i => i.main.temp_min));
        let max = Math.max(...items.map(i => i.main.temp_max));
        min = Math.round(min);
        max = Math.round(max);

        const midItem = items[Math.floor(items.length / 2)] || items[0];
        const iconHtml = getLuminousWeatherIcon(midItem.weather[0].icon, midItem.weather[0].main);

        const leftPercent = Math.max(0, Math.min(100, Math.round(((min - globalMin) / totalRange) * 100)));
        const barWidth = Math.max(18, Math.min(100 - leftPercent, Math.round(((max - min) / totalRange) * 100)));

        return `
            <div class="flex items-center justify-between text-xs py-0.5 border-b border-white/5 last:border-none">
                <span class="w-12 text-white/90 font-medium text-[11px]">${dayName}</span>
                <div class="w-6 flex items-center justify-center text-xs">${iconHtml}</div>
                <span class="w-7 text-right text-white/60 font-medium text-[10px]">${min}°</span>
                <div class="flex-1 mx-2 bg-black/25 rounded-full h-1 relative overflow-hidden">
                    <div class="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-300 to-orange-400" style="left: ${leftPercent}%; width: ${barWidth}%;"></div>
                </div>
                <span class="w-7 text-left text-white font-semibold text-[10px]">${max}°</span>
            </div>
        `;
    }).join("");
}

// -------------------------------------------------------------
// 24-HOUR MINI TEMPERATURE WAVE CURVE (Eliminates empty space)
// -------------------------------------------------------------
function renderMiniTempWave(hourlyList) {
    const svg = document.getElementById("miniTempWaveSvg");
    if (!svg || !hourlyList || hourlyList.length === 0) return;

    const temps = hourlyList.map(h => h.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const range = (maxTemp - minTemp) || 1;

    const peakLabel = document.getElementById("curvePeakLabel");
    if (peakLabel) {
        peakLabel.textContent = `High: ${Math.round(maxTemp)}° • Low: ${Math.round(minTemp)}°`;
    }

    const width = 320;
    const height = 48;
    const topPad = 12;
    const bottomPad = 10;
    const graphH = height - topPad - bottomPad;

    const points = hourlyList.map((item, index) => {
        const x = (index / (hourlyList.length - 1)) * (width - 24) + 12;
        const normalizedY = 1 - ((item.main.temp - minTemp) / range);
        const y = topPad + (normalizedY * graphH);
        return { x, y, temp: Math.round(item.main.temp) };
    });

    let dPath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX = (p0.x + p1.x) / 2;
        dPath += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const dArea = `${dPath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    let svgHtml = `
        <defs>
            <linearGradient id="miniCurveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0"/>
            </linearGradient>
        </defs>
        <path d="${dArea}" fill="url(#miniCurveGrad)" />
        <path d="${dPath}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
    `;

    points.forEach((p, idx) => {
        svgHtml += `
            <circle cx="${p.x}" cy="${p.y}" r="2" fill="#38bdf8" stroke="#ffffff" stroke-width="1" />
            <text x="${p.x}" y="${p.y - 4}" text-anchor="middle" font-size="8" font-family="-apple-system, sans-serif" font-weight="bold" fill="#ffffff">${p.temp}°</text>
        `;
    });

    svg.innerHTML = svgHtml;
}

// -------------------------------------------------------------
// LOCAL TIME CLOCK & SUN ARC POSITION
// -------------------------------------------------------------
function startLocalClock() {
    if (state.localTimeTimer) clearInterval(state.localTimeTimer);

    function tick() {
        const now = new Date();
        const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
        const cityDate = new Date(utcMs + (state.timezoneOffset * 1000));

        const timeStr = cityDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

        const dateStr = cityDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

        const el = document.getElementById("localTimeDisplay");
        if (el) {
            el.innerHTML = `${state.currentCity} &bull; ${timeStr}, ${dateStr}`;
        }

        if (state.currentData?.sys) {
            updateSunArcDot(state.currentData.sys.sunrise, state.currentData.sys.sunset, state.timezoneOffset);
        }
    }

    tick();
    state.localTimeTimer = setInterval(tick, 1000);
}

function updateSunArcDot(sunrise, sunset, timezoneOffset) {
    const label = document.getElementById("daylightStatus");
    const dot = document.getElementById("sunPosDot");
    if (!sunrise || !sunset) return;

    const now = Math.floor(Date.now() / 1000);
    const totalDaylight = sunset - sunrise;
    
    if (now < sunrise) {
        const diffHrs = ((sunrise - now) / 3600).toFixed(1);
        if (label) label.textContent = `Sunrise in approx ${diffHrs} hours`;
        if (dot) {
            dot.setAttribute("cx", "15");
            dot.setAttribute("cy", "45");
            dot.setAttribute("fill", "#94a3b8");
        }
    } else if (now > sunset) {
        if (label) label.textContent = `Sun has set for today`;
        if (dot) {
            dot.setAttribute("cx", "145");
            dot.setAttribute("cy", "45");
            dot.setAttribute("fill", "#94a3b8");
        }
    } else {
        const elapsed = now - sunrise;
        const pct = Math.max(0, Math.min(1, elapsed / totalDaylight));
        const remHrs = ((sunset - now) / 3600).toFixed(1);
        if (label) label.textContent = `Sunset in approx ${remHrs} hours`;

        if (dot) {
            // Quadratic bezier calculation: P(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
            // P0=(15, 45), P1=(80, 5), P2=(145, 45)
            const t = pct;
            const cx = Math.round((1 - t) * (1 - t) * 15 + 2 * (1 - t) * t * 80 + t * t * 145);
            const cy = Math.round((1 - t) * (1 - t) * 45 + 2 * (1 - t) * t * 5 + t * t * 45);
            dot.setAttribute("cx", cx.toString());
            dot.setAttribute("cy", cy.toString());
            dot.setAttribute("fill", "#fbbf24");
        }
    }
}

function formatEpochToCityTime(epoch, timezoneOffset) {
    const utcMs = epoch * 1000;
    const cityDate = new Date(utcMs + (timezoneOffset * 1000));
    return cityDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
    });
}

// -------------------------------------------------------------
// POPULAR CHIPS & SEARCH
// -------------------------------------------------------------
function initPopularChips() {
    const container = document.getElementById("popularChips");
    if (!container) return;

    container.innerHTML = POPULAR_CITIES.map(city => `
        <button 
            onclick="fetchWeather('${city}')" 
            class="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-[10px] font-medium shrink-0"
        >
            ${city}
        </button>
    `).join("");
}

function handleSearch() {
    const input = document.getElementById("cityInput");
    const query = input.value.trim();
    if (!query) return;
    fetchWeather(query);
}

// -------------------------------------------------------------
// UNIT TOGGLE (°C / °F)
// -------------------------------------------------------------
function toggleUnits() {
    state.unit = state.unit === "metric" ? "imperial" : "metric";

    const label = document.getElementById("unitLabel");
    if (label) {
        label.textContent = state.unit === "metric" ? "°C" : "°F";
    }

    if (state.currentCity) {
        fetchWeather(state.currentCity);
    }
}

// -------------------------------------------------------------
// DYNAMIC CANVAS ATMOSPHERIC WEATHER PARTICLES
// -------------------------------------------------------------
let canvas, ctx;
let particles = [];
let animFrameId = null;
let currentEffectType = "none";

function initWeatherCanvas() {
    canvas = document.getElementById("weatherEffectsCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();
}

function setWeatherParticleState(condition) {
    if (!canvas || !ctx) return;

    const cond = condition.toLowerCase();
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("thunderstorm")) {
        startParticles("rain");
    } else if (cond.includes("snow")) {
        startParticles("snow");
    } else if (cond.includes("clear")) {
        startParticles("shimmer");
    } else {
        stopParticles();
    }
}

function startParticles(type) {
    currentEffectType = type;
    particles = [];

    const count = type === "rain" ? 80 : type === "snow" ? 40 : 25;
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: type === "rain" ? Math.random() * 16 + 6 : Math.random() * 2.5 + 1.5,
            speed: type === "rain" ? Math.random() * 8 + 8 : type === "snow" ? Math.random() * 1.2 + 0.6 : Math.random() * 0.3 + 0.2,
            opacity: Math.random() * 0.35 + 0.15,
            drift: (Math.random() - 0.5) * 1.2,
        });
    }

    if (animFrameId) cancelAnimationFrame(animFrameId);
    loopParticles();
}

function loopParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
        if (currentEffectType === "rain") {
            ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - 1.5, p.y + p.length);
            ctx.stroke();

            p.y += p.speed;
            p.x -= 0.6;
            if (p.y > canvas.height) {
                p.y = -15;
                p.x = Math.random() * canvas.width;
            }
        } else if (currentEffectType === "snow") {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.length, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speed;
            p.x += Math.sin(p.y * 0.02) * 0.6;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        } else if (currentEffectType === "shimmer") {
            ctx.fillStyle = `rgba(253, 230, 138, ${p.opacity * 0.2})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.length, 0, Math.PI * 2);
            ctx.fill();

            p.y -= p.speed;
            if (p.y < 0) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }
        }
    }

    animFrameId = requestAnimationFrame(loopParticles);
}

function stopParticles() {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// -------------------------------------------------------------
// HELPERS
// -------------------------------------------------------------
function getWindCardinal(deg) {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return directions[Math.round(deg / 22.5) % 16];
}

function evaluateComfort(temp, humidity, isMetric) {
    const celsius = isMetric ? temp : (temp - 32) * 5 / 9;
    if (celsius > 32) return "• High heat advisory";
    if (celsius > 28 && humidity > 70) return "• Muggy & humid";
    if (celsius >= 20 && celsius <= 26 && humidity <= 65) return "• Optimal comfort";
    if (celsius < 10) return "• Chilly weather";
    if (celsius < 0) return "• Freezing temperatures";
    return "• Pleasant & temperate";
}

function showLoading(show) {
    const el = document.getElementById("loadingOverlay");
    if (!el) return;
    if (show) {
        el.classList.remove("hidden");
    } else {
        el.classList.add("hidden");
    }
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs shadow-2xl flex items-center gap-2 max-w-sm pointer-events-auto`;
    toast.innerHTML = `
        <i class="fas ${type === "error" ? "fa-circle-exclamation text-rose-400" : "fa-circle-check text-emerald-400"} text-xs"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("opacity-0", "transition-opacity", "duration-200");
        setTimeout(() => toast.remove(), 200);
    }, 3000);
}
