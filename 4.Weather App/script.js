const apiKey = "56c58e55eabd2eb95a5ec2cdc2e1cb83";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const errorDiv = document.getElementById("error");
const weatherDisplay = document.getElementById("weatherDisplay");
const recentSearchesList = document.getElementById("recentSearches");

searchBtn.addEventListener("click", () => fetchWeather(cityInput.value));
locationBtn.addEventListener("click", getLocation);

function fetchWeather(city) {
  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then((data) => {
      errorDiv.textContent = "";
      displayWeather(data);
      saveToLocalStorage(city);
      updateRecentSearches();
    })
    .catch((err) => {
      errorDiv.textContent = err.message;
    });
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "windSpeed"
  ).textContent = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById(
    "conditions"
  ).textContent = `Conditions: ${data.weather[0].description}`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        )
          .then((response) => response.json())
          .then((data) => {
            errorDiv.textContent = "";
            displayWeather(data);
          })
          .catch((err) => {
            errorDiv.textContent = "Failed to fetch weather for your location.";
          });
      },
      () => {
        errorDiv.textContent = "Location access denied.";
      }
    );
  } else {
    errorDiv.textContent = "Geolocation is not supported by this browser.";
  }
}

function saveToLocalStorage(city) {
  let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (!searches.includes(city)) {
    searches.push(city);
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  }
}

function updateRecentSearches() {
  const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recentSearchesList.innerHTML = searches
    .map((city) => `<li>${city}</li>`)
    .join("");
}

// Load recent searches on page load
updateRecentSearches();
