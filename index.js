let form = document.getElementById("searchForm");
form.addEventListener("submit", submit);
searchCity("sfax");

function submit(event) {
  event.preventDefault();
  let cityInputValue = document.querySelector("#cityInput").value;
  let cityElement = document.querySelector("#cityElement");
  searchCity(cityInputValue);
  cityElement.innerHTML = cityInputValue;
}
function searchCity(city) {
  let apiKey = "5f091c27ecd3875fabda53b65ecd4358";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let degreeElement = document.getElementById("degreeElement");
  degreeElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.getElementById("cityElement");
  cityElement.innerHTML = response.data.name;
  let looksLike = document.getElementById("looksLike");
  looksLike.innerHTML = response.data.weather[0].description;
  let humidityElement = document.getElementById("humidityElement");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${wind} Km/H`;
  let dateElement = document.getElementById("dateElement");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.getElementById("iconElement");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
