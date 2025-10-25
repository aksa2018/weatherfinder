// WeatherWise - script.js
const apiKey = "6537fe2ef6a07c219722f92039e5b8b0"; // your active key

const form = document.getElementById('searchForm');
const input = document.getElementById('cityInput');
const output = document.getElementById('weatherOutput');

form.addEventListener('submit', e => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) {
    output.textContent = "Please enter a city name.";
    return;
  }
  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  console.log("Fetching URL:", url); // debug

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("API response:", data); // debug

    if (data.cod === "401") {
      output.textContent = "Error: Invalid API key. Check your key.";
      return;
    }

    if (data.cod === "404") {
      output.textContent = "City not found 😕. Please check spelling.";
      return;
    }

    if (data.cod !== 200) {
      output.textContent = `Error: ${data.message}`;
      return;
    }

    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const desc = data.weather[0].description;

    output.innerHTML = `
      <h2>${data.name}</h2>
      <p>${temp}°C — ${condition} (${desc})</p>
    `;

    // Optional: change background color based on weather
    document.body.style.background = getBackground(condition);

  } catch (err) {
    output.textContent = "Error fetching weather.";
    console.error(err);
  }
}

// Optional function to change background dynamically
function getBackground(condition) {
  condition = condition.toLowerCase();
  if (condition.includes("cloud")) return "linear-gradient(120deg, #d7d2cc, #304352)";
  if (condition.includes("rain")) return "linear-gradient(120deg, #4e54c8, #8f94fb)";
  if (condition.includes("clear")) return "linear-gradient(120deg, #fefcea, #f1da36)";
  if (condition.includes("snow")) return "linear-gradient(120deg, #e6dada, #274046)";
  return "linear-gradient(120deg, #89f7fe, #66a6ff)";
}
